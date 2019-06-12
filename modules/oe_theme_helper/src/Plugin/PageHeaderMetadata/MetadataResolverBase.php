<?php


namespace Drupal\oe_theme_helper\Plugin\PageHeaderMetadata;


/**
 * Class MetadataResolverBase
 *
 * Base implementation of the metadata resolver. Creates the metadata array for
 * an entity.
 * @package Drupal\oe_theme_helper\Plugin\PageHeaderMetadata
 */
abstract class MetadataResolverBase {

  protected $entities;

  /**
   * MetadataResolverBase constructor.
   *
   * @param \Drupal\oe_theme_helper\Plugin\PageHeaderMetadata\FutCurrentEntities $entities
   */
  function __construct(FutCurrentEntities $entities) {
    $this->entities = $entities;
  }

  /**
   * Resolves and returns the array with the available metadata from the entity
   * @return mixed
   */
  public function getMetadata() {
    $metadata = [
      '_resolverClass' => get_class($this),
      '_entityClass' => get_class($this->entities->getPrimary()),
      'title' => $this->entities->getPrimary()->label()
    ];

    $extra = $this->_getMetadata();

    return array_merge ($metadata, $extra);
  }

  abstract protected function _getMetadata();
}