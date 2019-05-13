# Futurium base theme

[![Packagist](https://img.shields.io/badge/Packagist-v1.0.0--alpha-orange.svg)](https://packagist.org/packages/cnect-web/oe_theme)

Drupal 8 theme based on the [Open Europa Theme](https://github.com/openeuropa/oe_theme) and the  [Europa Component Library][1] (ECL).

## Requirements

This depends on the following software:

* [PHP 7.1](http://php.net/)

## Installation

The recommended way of installing the theme is via a [Composer][2].

In your Drupal project's main `composer.json` add the following dependency:

```json
{
    "require": {
      "cnect-web/blellow": "dev-develop"
    }
}
```
***TODO**: We should verify the above reference. *

And run:

```
$ composer update
```

## Development

The Blellow Theme project contains all the necessary code and tools for an effective development process,
meaning:

- All PHP development dependencies (Drupal core included) are required in [composer.json](composer.json)
- All Node.js development dependencies are required in [package.json](package.json)
- Project setup and installation can be easily handled thanks to the integration with the [Task Runner][4] project.
- All system requirements are containerized using [Docker Composer][5].
- Every change to the code base will be automatically tested using [Drone][17].

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

In order to download all required PHP code run:

```bash
composer install
```

This will build a fully functional Drupal site in the `./build` directory that can be used to develop and showcase the
theme.

Before setting up and installing the site make sure to customize default configuration values by copying [runner.yml.dist](runner.yml.dist)
to `./runner.yml` and override relevant properties.

To set up the project run:

```bash
./vendor/bin/run drupal:site-setup
```

This will:

- Symlink the theme in  `./build/themes/custom/oe_theme` so that it's available to the target site
- Setup Drush and Drupal's settings using values from `./runner.yml.dist`
- Setup PHPUnit and Behat configuration files using values from `./runner.yml.dist`

After a successful setup install the site by running:

```bash
./vendor/bin/run drupal:site-install
```

This will:

- Install the target site
- Set the OpenEuropa Theme as the default theme
- Enable OpenEuropa Theme Demo and [Configuration development][6] modules

### Using Docker Compose

Alternatively, you can build a development site using [Docker](https://www.docker.com/get-docker) and 
[Docker Compose](https://docs.docker.com/compose/) with the provided configuration.

Docker provides the necessary services and tools such as a web server and a database server to get the site running, 
regardless of your local host configuration.

#### Requirements:

- [Docker](https://www.docker.com/get-docker)
- [Docker Compose](https://docs.docker.com/compose/)

#### Configuration

By default, Docker Compose reads two files, a `docker-compose.yml` and an optional `docker-compose.override.yml` file.
By convention, the `docker-compose.yml` contains your base configuration and it's provided by default.
The override file, as its name implies, can contain configuration overrides for existing services or entirely new 
services.
If a service is defined in both files, Docker Compose merges the configurations.

Find more information on Docker Compose extension mechanism on [the official Docker Compose documentation](https://docs.docker.com/compose/extends/).

#### Usage

To start, run:

```bash
docker-compose up
```

It's advised to not daemonize `docker-compose` so you can turn it off (`CTRL+C`) quickly when you're done working.
However, if you'd like to daemonize it, you have to add the flag `-d`:

```bash
docker-compose up -d
```

Then:

```bash
docker-compose exec -u node node npm install
docker-compose exec -u node node npm run build
docker-compose exec web composer install
docker-compose exec web ./vendor/bin/run drupal:site-install
```

Using default configuration, the development site files should be available in the `build` directory and the development site
should be available at: [http://127.0.0.1:8080/build](http://127.0.0.1:8080/build).

#### Running the tests

To run the grumphp checks:

```bash
docker-compose exec web ./vendor/bin/grumphp run
```

To run the phpunit tests:

```bash
docker-compose exec web ./vendor/bin/phpunit
```

To run the behat tests:

```bash
docker-compose exec web ./vendor/bin/behat
```

### Disable Drupal 8 caching

Manually disabling Drupal 8 caching is a laborious process that is well described [here][4].

Alternatively, you can use the following Drupal Console command to disable/enable Drupal 8 caching:

```bash
./vendor/bin/drupal site:mode dev  # Disable all caches.
./vendor/bin/drupal site:mode prod # Enable all caches.
```

Note: to fully disable Twig caching the following additional manual steps are required:

1. Open `./build/sites/default/services.yml`
2. Set `cache: false` in `twig.config:` property. E.g.:

```yaml
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

```bash
npm run build
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

```bash
npm run watch
```

Resulting changes are not meant to be committed to this repository.

#### Patching ECL components

ECL components can be patched by using the [`patch-package`][18] NPM project.

To patch a component:

1. Modify its source files directly in `./node_modules/@ecl/[component-name]`
2. Run:

```bash
npx patch-package @ecl/[component-name]
```

Or, when using Docker Compose:

```bash
docker-compose exec -u node node npx patch-package @ecl/[component-name]
```

Patches will be generated in `./patches` and applied when running `npm install`.

[1]: https://github.com/ec-europa/europa-component-library
[2]: https://www.drupal.org/docs/develop/using-composer/using-composer-to-manage-drupal-site-dependencies#managing-contributed
[3]: https://github.com/openeuropa/oe_theme/releases
[4]: https://github.com/openeuropa/task-runner
[5]: https://docs.docker.com/compose
[6]: https://www.drupal.org/project/config_devel
[7]: https://nodejs.org/en
[8]: https://www.drupal.org/project/drupal/issues/474684
[9]: https://www.drupal.org/files/issues/474684-151.patch
[10]: https://www.drupal.org/docs/8/extending-drupal-8/installing-themes
[11]: https://www.drupal.org/docs/8/theming-drupal-8/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-theme
[12]: https://www.docker.com/get-docker
[13]: https://docs.docker.com/compose
[14]: https://www.drupal.org/node/2598914
[15]: https://github.com/hechoendrupal/drupal-console/issues/3854
[16]: https://github.com/openeuropa/ecl-twig-loader
[17]: https://drone.io
[18]: https://www.npmjs.com/package/patch-package

#### Patch the ECL build script
An improved version of the ecl-builder is used for this project. After the installation we should patch the script:
- [Patch the `@ecl/builder` build script](https://gist.github.com/skounis/124182c5bc5ef0e45920a2c867f7e160)

## Dependencies 
The theme needs the "**OpenEuropa Theme Helper**" module installed.

## Misc
### Style guide
The development environment will install the Styleguide module. The test page is available in the URL:
- http://localhost:8080/build/admin/appearance/styleguide
