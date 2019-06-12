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


  public static function create(FutCurrentEntities $entities): MetadataResolverBase {
    $className = get_class($entities->getPrimary());

    $instance = NULL;

    switch ($className) {
      case Node::class:
        $instance = new NodeMetadataResolver($entities);
        break;
      case Group::class:
        $instance = new GroupMetadataResolver($entities);
        break;

      default:
        $instance = new DefaultMetadataResolver($entities);
    }
    return $instance;
  }

}