<?php


namespace Drupal\oe_theme_helper\Plugin\PageHeaderMetadata;


use Drupal\group\Entity\GroupInterface;
use Drupal\image\Entity\ImageStyle;

class FutGroupHelper {

  /**
   * Provides a list of operations for a group.
   *
   * @param \Drupal\group\Entity\GroupInterface $group
   *   The group to generate the operations for.
   *
   * @return array
   *   An associative array of operation links to show in the block.
   */
  public static function getGroupOperations(GroupInterface $group) {
    $group_operations = [];

    foreach ($group->getGroupType()->getInstalledContentPlugins() as $plugin) {
      /** @var \Drupal\group\Plugin\GroupContentEnablerInterface $plugin */
      $group_operations += $plugin->getGroupOperations($group);
    }

    if ($group_operations) {
      // TODO: Do we really need this?
      // Allow modules to alter the collection of gathered links.
      // $this->moduleHandler->alter('group_operations', $group_operations, $group);

      // Sort the operations by weight.
      uasort($group_operations, '\Drupal\Component\Utility\SortArray::sortByWeightElement');

      return $group_operations;
    }
  }


  /**
   * Constructs array with src path for image and alt text.
   *
   * @param \Drupal\group\Entity\GroupInterface $group
   *   Group Entity.
   *
   * @return array
   *   Array with src and alt.
   */
  public static function getVisualIdentity(GroupInterface $group) {
    if (empty($group->fut_logo->first()->entity)) {
      return '';
    }

    $file_entity = $group->fut_logo->first()->entity;

    $image_src = ImageStyle::load('fut_group_logo')
      ->buildUrl($file_entity
        ->get('uri')
        ->first()
        ->getString());
    $alt = $group->fut_logo->alt ?? '';

    $image = [
      'src' => $image_src,
      'alt' => $alt,
    ];

    return $image;
  }

}