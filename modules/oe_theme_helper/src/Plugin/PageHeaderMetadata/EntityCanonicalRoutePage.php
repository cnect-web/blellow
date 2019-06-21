<?php

declare(strict_types = 1);

namespace Drupal\oe_theme_helper\Plugin\PageHeaderMetadata;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\fut_group\RequestEntityExtractor;
use Drupal\oe_theme_helper\PageHeaderMetadataPluginBase;
use Drupal\oe_theme_helper\Plugin\PageHeaderMetadata\Model\FutCurrentEntities;
use Drupal\oe_theme_helper\Plugin\PageHeaderMetadata\Resolver\MetadataResolverFactory;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Defines a page header metadata plugin that extracts data from current entity.
 *
 * @PageHeaderMetadata(
 *   id = "entity_canonical_route",
 *   label = @Translation("Default entity metadata extractor")
 * )
 */
class EntityCanonicalRoutePage extends PageHeaderMetadataPluginBase implements ContainerFactoryPluginInterface {

  /**
   * The current route match.
   *
   * @var \Drupal\Core\Routing\RouteMatchInterface
   */
  protected $currentRouteMatch;

  /**
   * The request entity extractor. Gets access to the active or related Group
   * in the context.
   *
   * @var \Drupal\fut_group\RequestEntityExtractor
   */
  protected $requestEntityExtractor;

  /**
   * Creates a new EntityPageHeaderMetadata object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Routing\RouteMatchInterface $current_route_match
   *   The current route match.
   * @param \Drupal\fut_group\RequestEntityExtractor $request_entity_extractor
   *   The request entity extractor.
   */
  public function __construct(array $configuration, string $plugin_id, $plugin_definition, RouteMatchInterface $current_route_match, RequestEntityExtractor $request_entity_extractor) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->currentRouteMatch = $current_route_match;
    $this->requestEntityExtractor = $request_entity_extractor;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): self {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('current_route_match'),
      $container->get('fut_group.request_entity_extractor')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function applies(): bool {
    $entity = $this->getEntityFromCurrentRoute();

    return !empty($entity);
  }

  /**
   * {@inheritdoc}
   */
  public function getMetadata(): array {
    $entities = $this->getEntities();

    // Create a resolver
    $resolver = MetadataResolverFactory::create($entities);
    $metadata = $resolver->getMetadata();

    $cacheability = new CacheableMetadata();
    $cacheability
      ->addCacheableDependency($entities->getPrimary())
      ->addCacheContexts(['route'])
      ->applyTo($metadata);

    return $metadata;
  }

  /**
   * {@inheritdoc}
   */
  public function getEntityFromCurrentRoute(): ?ContentEntityInterface {
    if (($route = $this->currentRouteMatch->getRouteObject()) && ($parameters = $route->getOption('parameters'))) {
      // Determine if the current route represents an entity.
      foreach ($parameters as $name => $options) {
        if (isset($options['type']) && strpos($options['type'], 'entity:') === 0) {
          $entity = $this->currentRouteMatch->getParameter($name);
          if ($entity instanceof ContentEntityInterface && $this->currentRouteMatch->getRouteName() === "entity.{$entity->getEntityTypeId()}.canonical") {
            return $entity;
          }
        }
      }
    }

    return NULL;
  }

  /**
   * @return \Drupal\oe_theme_helper\Plugin\PageHeaderMetadata\Model\FutCurrentEntities
   */
  public function getEntities(): FutCurrentEntities {
    // Currently we care only for Groups and Nodes. If both exist
    $arr = array();
    $arr [] = $this->requestEntityExtractor->getGroup();
    $arr [] = $this->requestEntityExtractor->getNode();
    $arr = array_filter($arr);

    // If Group Extractor fails try to capture the entity from the route
    // TODO: Fix the reducers in `FutCurrentEntities` when
    if (empty($arr)) {
      $arr [] = $this->getEntityFromCurrentRoute();
    }

    $entities = new FutCurrentEntities($arr);

    return $entities;
  }
}
