<?php

declare(strict_types = 1);

namespace Drupal\blellow_helper\Loader;

use Drupal\Core\Extension\ThemeHandler;
use OpenEuropa\Twig\Loader\EuropaComponentLibraryLoader;

/**
 * Class ComponentLibraryLoader.
 */
class ComponentLibraryLoader extends EuropaComponentLibraryLoader {

  /**
   * {@inheritdoc}
   */
  public function __construct($namespaces, $root, $theme, $directory, ThemeHandler $theme_handler) {
    // Make sure the theme exists before getting its path.
    // This is necessary when the "blellow_helper" module is enabled before
    // the theme is or the theme is disabled and the "blellow_helper" is not.
    $path = '';
    if ($theme_handler->themeExists($theme)) {
      $path = $theme_handler->getTheme($theme)->getPath() . DIRECTORY_SEPARATOR . $directory;
    }
    parent::__construct($namespaces, $path, $root, '');
  }

}
