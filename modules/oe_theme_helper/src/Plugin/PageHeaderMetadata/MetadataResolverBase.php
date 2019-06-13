<?php


namespace Drupal\oe_theme_helper\Plugin\PageHeaderMetadata;


/**
 * Class MetadataResolverBase
 *
 * Base implementation of the metadata resolver. Creates the metadata array for
 * an entity.
 * @package Drupal\oe_theme_helper\Plugin\PageHeaderMetadata
 */
abstract class MetadataResolverBase {

  protected $entities;

  /**
   * MetadataResolverBase constructor.
   *
   * @param \Drupal\oe_theme_helper\Plugin\PageHeaderMetadata\FutCurrentEntities $entities
   */
  function __construct(FutCurrentEntities $entities) {
    $this->entities = $entities;
  }

  /**
   * Resolves and returns the array with the available metadata from the entity
   * @return mixed
   */
  public function getMetadata() {
    //
    // From https://v1--europa-component-library.netlify.com/ec/components/detail/ec-component-page-header--default
    //
    // {#
    //  Parameters:
    //  - "variant" (string) (default: 'default'): could be "basic" or "default"
    //  - "identity" (string) (default: ''): name of the site, i.e. "Site identity"
    //  - "breadcrumb" (array)  (default: []): collection of @ecl/ec-component-link
    //  - "language_switcher" (object) (default: ''): object of type
    //                                                @ecl/generic-component-lang-select-page
    //  - "title" (string) (default: ''): page title
    //  - "introduction" (string) (default: ''): A short and striking phrase
    //                                           related to the site identification
    //                                           (45 characters maximum)
    //  - "metas" (array) (default: []): array of strings ; each one corresponds
    //                                   to a meta item
    //  - "extra_classes" (string) (default: '')
    //  - "extra_attributes" (array) (default: []): format: [
    //       {
    //         "name" (string) (default: ''),
    //         "value" (string) (default: '')
    //       },
    //     ...
    //     ]
    // #}
    //
    // With the additions:
    //  1. Action Groups (links) rendered as a drop-down button. eg: Group Operations
    //  2. Target link, a url the title could point to. eg: the Group URL
    //
    // Note
    // ====
    // Identity: We will let the Block plugin contribute it in the rendering
    //           array, due to the dependencies it has.
    // Breadcrumb: We will let the Block plugin contribute it in the rendering
    //             array, due to the dependencies it has.
    //
    // Both of the above are common for the site and not related to the
    // resolving process which is based on the typ

    $metadata = [
      'title' => $this->entities->getPrimary()->label(),
      'metas' => ['news article', '17 September 2014'],
      '_resolverClass' => get_class($this),
      '_entityClass' => get_class($this->entities->getPrimary()),
    ];

    $extra = $this->_getMetadata();

    return array_merge ($metadata, $extra);
  }

  abstract protected function _getMetadata();
}