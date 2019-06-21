<?php

namespace Drupal\oe_theme_helper\Plugin\PageHeaderMetadata\Model;

use Drupal\group\Entity\Group;

class FutCurrentEntities {
  /**
   * The current and primary entity to resolve. When an entity is related
   * (belongs) to a Group, the group is our primary entity and from where
   * we should extract details for the header.
   *
   * @var Drupal\Core\Entity\EntityInterface;
   */
  protected $primary;

  /**
   * The related to the entity to the primary. Usually a Post or Event that
   * belongs to a Group.
   * @var Drupal\Core\Entity\EntityInterface
   */
  protected $related;

  /**
   * The primary entity.
   * @return \Drupal\oe_theme_helper\Plugin\PageHeaderMetadata\Drupal\Core\Entity\EntityInterface|mixed
   */
  public function getPrimary(){
    return $this->primary;
  }

  /**
   * The related entity.
   * @return \Drupal\oe_theme_helper\Plugin\PageHeaderMetadata\Drupal\Core\Entity\EntityInterface|mixed
   */
  public function getRelated(){
    return $this->related;
  }

  /**
   * FutCurrentEntities constructor.
   *
   * @param array $entities
   */
  function __construct(Array $entities) {
    $this->primary = $this->reduce($entities, [$this, 'primaryReducer']);
    $this->related = $this->reduce($entities, [$this, 'relatedReducer']);
  }

  /**
   * Reduces the array to its first Entity or its first Group.
   *
   * @param $carry
   *  The previously captured item
   * @param $item
   *  The current item to check
   *
   * @return mixed
   */
  private function primaryReducer($carry, $item) {
    $carry = $carry ?? $item;
    if (get_class($item) == Group::class) {
      $carry = $item;
    }
    return $carry;
  }

  private function relatedReducer($carry, $item) {
    if (get_class($item) != Group::class) {
      $carry = $item;
    }
    return $carry;
  }

  /**
   * Capture the primary entity. Group is considered the primary entity
   * if exists
   * @param $array
   *  The array with the captured entities.
   *
   * @param $reducer
   *  The reducer.
   *
   * @return mixed
   *  The primary entity.
   */
  private function reduce($array, $reducer){
    return array_reduce($array, $reducer);
  }


}