<?php


namespace Drupal\oe_theme_helper\Plugin\PageHeaderMetadata;

/**
 * Class NodeMetadataResolver
 *
 * @package Drupal\oe_theme_helper\Plugin\PageHeaderMetadata
 */
class NodeMetadataResolver extends MetadataResolverBase {

  public function _getMetadata() {
    $metadata = [
      '_extra' => NodeMetadataResolver::class
    ];

    return $metadata;
  }
}