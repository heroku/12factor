(function ($) {

    // Links that open in a new window
    function new_window_alert() {

        var link_warning = $('<div class="new-window-warning"></div>').css({
            display : 'none'
        }).appendTo('body');

        $('a[target=_blank]').each(function() {
            // Add the screen reader text
            $(this).append('<img src="wp-content/themes/orbit-media/resources/images/Icons/glyph-external-link-purple.svg" alt="Opens in a new window" class="new-window-icon" />');
        });
    }

    $(document).ready(function() {

        // Alert for links that open in a new window
        // WCAG 3.2
        new_window_alert();

        // Hero Video Controls
        $('button.play-pause').on('click', function(e) {
            if ($('.background-video video').get(0).paused) {
                $('.background-video video').trigger('play');
                $('button.play-pause').attr('aria-pressed', 'false');
                $('button.play-pause span').text('Pause Video');
                $('button.play-pause').addClass('pause').removeClass('play');
            } else {
                $('.background-video video').trigger('pause');
                $('button.play-pause').attr('aria-pressed', 'true');
                $('button.play-pause span').text('Play Video');
                $('button.play-pause').addClass('play').removeClass('pause');
            }
            e.stopPropagation();
        });

    } );// End document.ready

})( jQuery );
