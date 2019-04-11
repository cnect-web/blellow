<?php

declare(strict_types = 1);

namespace Drupal\oe_theme_helper\Plugin\Block;

use Drupal\Component\Utility\NestedArray;
use Drupal\Core\Access\AccessResult;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Render\RendererInterface;
use Drupal\Core\Session\AccountInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides an OpenEuropa Footer block.
 *
 * @Block(
 *   id = "oe_login",
 *   admin_label = @Translation("Login block"),
 *   category = @Translation("Cnect Corporate blocks"),
 * )
 */
//class LoginBlock extends BlockBase implements ContainerFactoryPluginInterface {
class LoginBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  protected function blockAccess(AccountInterface $account) {
    return AccessResult::allowedIfHasPermission($account, 'access content');
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build['#theme'] = 'oe_corporate_blocks_login';

    $build['#attached'] = [
        'library' => [
          'oe_theme_helper/login_register',
        ],
      ];
    return $build;
  }

}
