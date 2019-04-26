<?php

declare(strict_types = 1);

namespace Drupal\blellow_helper\Plugin\Block;

use Drupal\Component\Utility\NestedArray;
use Drupal\Core\Access\AccessResult;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Render\RendererInterface;
use Drupal\Core\Session\AccountInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides the login widget as a block.
 *
 * @Block(
 *   id = "cnect_login",
 *   admin_label = @Translation("Login block"),
 *   category = @Translation("Cnect Corporate blocks"),
 * )
 */
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
    $build['#theme'] = 'cnect_corporate_blocks_login';

    $build['#attached'] = [
        'library' => [
          'blellow_helper/login_register',
        ],
      ];
    return $build;
  }

}
