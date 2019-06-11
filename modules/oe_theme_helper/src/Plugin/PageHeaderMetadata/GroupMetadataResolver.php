<?php


namespace Drupal\oe_theme_helper\Plugin\PageHeaderMetadata;

/**
 * Class GroupMetadataResolver
 *
 * @package Drupal\oe_theme_helper\Plugin\PageHeaderMetadata
 */
class GroupMetadataResolver extends MetadataResolverBase {

  public function _getMetadata() {
    $metadata = [
      '_extra' => GroupMetadataResolver::class
    ];

    return $metadata;
  }
}