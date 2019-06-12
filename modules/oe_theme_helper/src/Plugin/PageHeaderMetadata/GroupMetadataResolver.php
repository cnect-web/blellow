<?php


namespace Drupal\oe_theme_helper\Plugin\PageHeaderMetadata;

/**
 * Class GroupMetadataResolver
 *
 * @package Drupal\oe_theme_helper\Plugin\PageHeaderMetadata
 */
class GroupMetadataResolver extends MetadataResolverBase {


  public function _getMetadata() {
    $group = $this->entities->getPrimary();
    $node = $this->entities->getRelated();
    $visual_identity = FutGroupHelper::getVisualIdentity($group);
    $group_operations = FutGroupHelper::getGroupOperations($group);
    //
    // $breadcrumb = $this->breadcrumbBuilder->build($this->requestEntityExtractor->getRouteMatch());

    $metadata = [
      'group' => $group,
      'node' => $node,
      'visual_identity' => $visual_identity,
      'group_operations' => $group_operations,
      '_extra' => GroupMetadataResolver::class
    ];

    return $metadata;
  }
}