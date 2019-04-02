# Futurium base theme

[![Packagist](https://img.shields.io/badge/Packagist-v1.0.0--alpha-orange.svg)](https://packagist.org/packages/cnect-web/oe_theme)

Drupal 8 theme based on the [Open Europa Theme](https://github.com/openeuropa/oe_theme) and the  [Europa Component Library][1] (ECL).

## Requirements

This depends on the following software:

* [PHP 7.1](http://php.net/)

## Installation

The recommended way of installing the theme is via a [Composer-based workflow][2].

In your Drupal project's main `composer.json` add the following dependency:

```json
{
    "require": {
      "cnect-web/oe_theme": "dev-develop"
    }
}
```

And run:

```
$ composer update
```

## Development

The Futurium Theme project contains all the necessary code and tools for an effective development process,
meaning:

- All PHP development dependencies (Drupal core included) are required in [composer.json](composer.json)
- All Node.js development dependencies are required in [package.json](package.json)


### Project setup

Developing the theme requires a local copy of ECL assets, including Twig templates, SASS and JavaScript source files.

In order to fetch the required code you'll need to have [Node.js (>= 8)](https://nodejs.org/en) installed locally.

To install required Node.js dependencies run:

```
$ npm install
```

To build the final artifacts run:

```
$ npm run build
```

This will compile all SASS and JavaScript files into self-contained assets that are exposed as [Drupal libraries][3].

### Disable Drupal 8 caching

Manually disabling Drupal 8 caching is a laborious process that is well described [here][4].

Alternatively, you can use the following Drupal Console command to disable/enable Drupal 8 caching:

```
$ ./vendor/bin/drupal site:mode dev  # Disable all caches.
$ ./vendor/bin/drupal site:mode prod # Enable all caches.
```

Note: to fully disable Twig caching the following additional manual steps are required:

1. Open `./build/sites/default/services.yml`
2. Set `cache: false` in `twig.config:` property. E.g.:
```
parameters:
     twig.config:
       cache: false
 ```
3. Rebuild Drupal cache: `./vendor/bin/drush cr`

This is due to the following [Drupal Console issue][5].

### Working with ECL components

You can use the ECL components in your Twig templates by referencing them using the [ECL Twig Loader][6]
as shown below:

```twig
{% include '@ecl/logos' with {
  'to': 'https://ec.europa.eu',
  'title': 'European Commission',
} %}
```

Or:

```twig
{% include '@ec-europa/ecl-logos' with {
  'to': 'https://ec.europa.eu',
  'title': 'European Commission',
} %}
```

JavaScript components can be accessed by `ECL.methodName()`, e.g. `ECL.accordions()`.

*Important:* not all ECL templates are available to the theme for include, whenever you need include a new ECL template
remember to add it to the `copy` section of [ecl-builder.config.js](ecl-builder.config.js) and run:

```
$ npm run build
```

#### Update ECL

To update ECL components change the `@ec-europa/ecl-preset-full` version number in [package.json](package.json) and run:

```
$ npm install && npm run build
```

This will update assets such as images and fonts and re-compile CSS. Resulting changes are not meant to be committed to
this repository.

#### Watching and re-compiling Sass and JS changes

To watch for Sass and JS file changes - [/sass](/sass) folder - in order to re-compile them to the destination folder:

```
$ npm run watch
```

Resulting changes are not meant to be committed to this repository.

#### Patching ECL components

ECL components can be patched by using the [`patch-package`][7] NPM project.

To patch a component:

1. Modify its source files directly in `./node_modules/@ecl/[component-name]`
2. Run:

```
$ npx patch-package @ecl/[component-name]
```

[1]: https://github.com/ec-europa/europa-component-library
[2]: https://www.drupal.org/docs/develop/using-composer/using-composer-to-manage-drupal-site-dependencies#managing-contributed
[3]: https://www.drupal.org/docs/8/theming-drupal-8/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-theme
[4]: https://www.drupal.org/node/2598914
[5]: https://github.com/hechoendrupal/drupal-console/issues/3854
[6]: https://github.com/openeuropa/ecl-twig-loader
[7]: https://www.npmjs.com/package/patch-package


## Dependencies 
The theme needs the "**OpenEuropa Theme Helper**" module installed.

## Misc
### Style guide
- http://localhost:8080/build/admin/appearance/styleguide
