(function ($) {

  Drupal.behaviors.dialogAutoFit = {
    attach: function (context, settings) {
      $(window).once().on('dialog:aftercreate', function (e, dialog, $element, settings) {
        $("#drupal-modal").dialog({height:'auto'});
      });
    }
  };

  Drupal.behaviors.buttonBehaviors = {
    attach: function (context, settings) {
      $(".disabled").once().click(function (e) {
        e.preventDefault();
      });

      $(".btn--interest:not([disabled])").click(function (e) {
        e.preventDefault();
        addInterest( $(this) );
      });
    }
  };

  Drupal.behaviors.userMenuToggle = {
    attach: function (context, settings) {
      $("a.account-info__wrapper", context).once().click(function(e) {
        e.preventDefault();
        $(".account-info__dropdown").toggle(200);
      })
    }
  };

  function addInterest ($btn) {

    var $interestedBtn = $btn;
    var $cancelBtn = $('<div class="no-child-margins opposite"><button class="btn btn--grey">' + $interestedBtn.attr("data-toggle-label") + '</button></div>');
    var marginGap = 0;

    $interestedBtn.off("click");
    $interestedBtn.toggleClass("flip");
    $interestedBtn.blur();
    setTimeout(function() {
      $interestedBtn.prepend('<svg class="svg-inline--fa fa-check fa-w-16" aria-hidden="true" data-prefix="fa" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg> ');
      //$interestedBtn.css({transform: "rotateX(0deg)"});
      $interestedBtn.removeClass("flip");
      $interestedBtn.prop("disabled", true);
      $interestedBtn.addClass("disabled");
    }, 200);

    $cancelBtn.css({opacity: 0});
    $interestedBtn.after($cancelBtn);

    console.log("hello sergey");


    if (!$interestedBtn.parent().hasClass("btn-list--center")) {
     marginGap = $interestedBtn.offset().top - $cancelBtn.offset().top - 4;
    }

    $cancelBtn.css({display: "none", marginTop : marginGap});

    $cancelBtn.slideToggle(200);
    $cancelBtn.animate({opacity: 1}, 200);

    $cancelBtn.children(".btn").click(function (e) {
      e.preventDefault();

      cancelInterest( $(this) );
    });
  }

  function cancelInterest ($btn) {

    var $cancelBtn = $btn.parent(),
        $interestedBtn = $cancelBtn.prev(".btn--interest");

    $cancelBtn.off("click");
    $cancelBtn.animate({opacity: 0}, 200);
    $cancelBtn.slideToggle(200, function () {
      $cancelBtn.remove();
    });

    $interestedBtn.prop("disabled", false);
    $interestedBtn.removeClass("disabled");
    $interestedBtn.toggleClass("flip");
    setTimeout(function() {
      $interestedBtn.find("svg").remove();
      $interestedBtn.removeClass("flip");
      $interestedBtn.prop("disabled", false);
      $interestedBtn.removeClass("disabled");
      $interestedBtn.click(function (e) {
        e.preventDefault();

        addInterest( $(this) );
      });

    }, 200);

  }

})(jQuery);
