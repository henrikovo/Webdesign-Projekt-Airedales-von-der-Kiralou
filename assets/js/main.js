/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

  var $window = $(window),
    $body = $('body'),
    $main = $('#main');

  ie5 = (document.getElementById && document.all && document.styleSheets) ? 1 : 0;

  if (ie5) {
    document.write(
      "<div style='position:absolute;top:-500;left:0;z-index:100' id='alert'>" +
      "<form name='alertform'>" +
      "<table style='border-style:outset;border-width:2;border-color:#E6E6CD;background-color:#F5F5DC' cellpadding='5' cellspacing='2' width='340' height='230'>" +
      "<tr><td height='30' align='center' bgcolor='#DEDEC5'>" +
      "<input type='text' name='titleelement' size='35' style='border-width:0;background-color:#DEDEC5;font-weight:bold;text-align:center' onfocus='if(this.blur)this.blur()'>" +
      "</td></tr>" +
      "<tr><td align='center'>" +
      "<tex" +
      "tarea name='textelement' rows='8' cols='42' style='border-width:0;background-color:#F5F5DC;font-family:verdana,arial;font-size:80%;scrollbar-track-color:#F5F5DC;scrollbar-face-color:#F5F5DC;scrollbar-highlight-color:#C8C8B2;scrollbar-3dlight-color:#F5F5DC;scrollbar-darkshadow-color:#F5F5DC;scrollbar-shadow-color:#C8C8B2;scrollbar-arrow-color:#F5F5DC;overflow:auto' readonly></t" +
      "extarea>" +
      "</td></tr>" +
      "<tr><td height='50' align='center'>" +
      "<input style='background-color:#E9E9CF;border-width:1;font-weight:bold' type='button' value='    OK    ' onclick='hideAlert()' onfocus='if(this.blur)this.blur()'>" +
      "</td></tr>" +
      "</table>" +
      "</form>" +
      "</div>"
    );
  }

  function showAlert(title, text) {
    if (ie5) {
      document.getElementById("alert").style.left = document.body.clientWidth / 2 - 170 + document.body.scrollLeft;
      document.getElementById("alert").style.top = document.body.clientHeight / 2 - 115 + document.body.scrollTop;

      document.alertform.titleelement.value = title;
      document.alertform.textelement.value = text;
    } else alert(title + "nn" + text);
  }

  function hideAlert() {
    document.getElementById("alert").style.top = -500;
  }

  // Breakpoints.
  breakpoints({
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: ['361px', '480px'],
    xxsmall: [null, '360px']
  });

  // Play initial animations on page load.
  $window.on('load', function() {
    window.setTimeout(function() {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Nav.
  var $nav = $('#nav');

  if ($nav.length > 0) {

    // Shrink effect.
    $main
      .scrollex({
        mode: 'top',
        enter: function() {
          $nav.addClass('alt');
        },
        leave: function() {
          $nav.removeClass('alt');
        },
      });

    // Links.
    var $nav_a = $nav.find('a');

    $nav_a
      .scrolly({
        speed: 1000,
        offset: function() {
          return $nav.height();
        }
      })
      .on('click', function() {

        var $this = $(this);

        // External link? Bail.
        if ($this.attr('href').charAt(0) != '#')
          return;

        // Deactivate all links.
        $nav_a
          .removeClass('active')
          .removeClass('active-locked');

        // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
        $this
          .addClass('active')
          .addClass('active-locked');

      })
      .each(function() {

        var $this = $(this),
          id = $this.attr('href'),
          $section = $(id);

        // No section for this link? Bail.
        if ($section.length < 1)
          return;

        // Scrollex.
        $section.scrollex({
          mode: 'middle',
          initialize: function() {

            // Deactivate section.
            if (browser.canUse('transition'))
              $section.addClass('inactive');

          },
          enter: function() {

            // Activate section.
            $section.removeClass('inactive');

            // No locked links? Deactivate all links and activate this section's one.
            if ($nav_a.filter('.active-locked').length == 0) {

              $nav_a.removeClass('active');
              $this.addClass('active');

            }

            // Otherwise, if this section's link is the one that's locked, unlock it.
            else if ($this.hasClass('active-locked'))
              $this.removeClass('active-locked');

          }
        });

      });

  }

  // Scrolly.
  $('.scrolly').scrolly({
    speed: 1000
  });

})(jQuery);