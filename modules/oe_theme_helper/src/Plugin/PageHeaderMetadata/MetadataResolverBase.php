<?php


namespace Drupal\oe_theme_helper\Plugin\PageHeaderMetadata;

use Drupal\Core\Entity\EntityInterface;

/**
 * Class MetadataResolverBase
 *
 * Base implementation of the metadata resolver. Creates the metadata array for
 * an entity.
 * @package Drupal\oe_theme_helper\Plugin\PageHeaderMetadata
 */
abstract class MetadataResolverBase {

  /**
   * The current entity to resolve.
   *
   * @var Drupal\Core\Entity\EntityInterface;
   */
  protected $entity;

  function __construct(EntityInterface $entity) {
    $this->entity = $entity;
  }

  /**
   * Resolves and returns the array with the available metadata from the entity
   * @return mixed
   */
  public function getMetadata() {
    $metadata = [
      '_resolverClass' => get_class($this),
      '_entityClass' => get_class($this->entity),
      'title' => $this->entity->label()
    ];

    $extra = $this->_getMetadata();

    return array_merge ($metadata, $extra);
  }

  abstract protected function _getMetadata();
}