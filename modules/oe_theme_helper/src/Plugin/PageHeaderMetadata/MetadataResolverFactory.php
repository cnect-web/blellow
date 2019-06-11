<?php


namespace Drupal\oe_theme_helper\Plugin\PageHeaderMetadata;


use Drupal\Core\Entity\EntityInterface;
use Drupal\group\Entity\Group;
use Drupal\node\Entity\Node;

/**
 * Class MetadataResolverFactory
 *
 * @package Drupal\oe_theme_helper\Plugin\PageHeaderMetadata
 */
class MetadataResolverFactory {

  /**
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *
   * @return \Drupal\oe_theme_helper\Plugin\PageHeaderMetadata\MetadataResolverBase
   */
  public static function create(EntityInterface $entity): MetadataResolverBase {
    $className = get_class($entity);

    $instance = NULL;

    switch ($className) {
      case Node::class:
        $instance = new NodeMetadataResolver($entity);
        break;
      case Group::class:
        $instance = new GroupMetadataResolver($entity);
        break;

      default:
        $instance = new DefaultMetadataResolver($entity);
    }
    return $instance;
  }

}