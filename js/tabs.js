(function ($) {
    Drupal.behaviors.tabsBehaviors = {
        attach: function (context, settings) {
            var active_class = 'active';
            $('.tabs-container').hide();
            var tab_index = $('.tabs-link.' + active_class).attr('tab-index');
            $('#tab-container-' + tab_index).show();

            $('.tabs-link').each(function () {
                $(this).click(function (e) {
                    var tab_index = $(this).attr('tab-index');
                    e.preventDefault();

                    // Make the old tab inactive.
                    $('.tabs-links').removeClass(active_class);
                    $(this).addClass(active_class);

                    $('.tabs-container').hide();
                    $('#tab-container-' + tab_index).show();
                });
            });
        }
    };
})(jQuery);