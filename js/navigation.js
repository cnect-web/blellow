/**
 * @file
 * ECL navigation menu behavior.
 */
(function (ECL, Drupal) {
  Drupal.behaviors.eclNavigationMenu = {
    attach: function attach(context, settings) {
      if (context == document) {
        ECL.megamenu();
      }
    }
  };
})(ECL, Drupal);
