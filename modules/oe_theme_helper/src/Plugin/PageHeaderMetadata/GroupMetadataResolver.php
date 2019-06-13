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

    $groupUrl = $group->toUrl();
    $url = [];
    if (!empty($groupUrl)) {
      $url =  $groupUrl->getInternalPath();
    }

    $actions = FutGroupHelper::groupActionsToECLArray($group_operations);
    $metadata = [
      'image' => $visual_identity,
      'actions' => $actions,
      'url' => $url,
      '_group' => $group,
      '_node' => $node,
      '_extra' => GroupMetadataResolver::class
    ];

    return $metadata;
  }
}