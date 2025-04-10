/**
 * Check for transition blocks on the page and adjust them accordingly.
 *
 * @author Orbit Media Studios
 */
(function($) {

    $(window).on('load resize scroll', function() {
        oms_check_transition_blocks();
    });

    /**
     * Moves a block between the prev/next elements by calculating and updating the margins/paddings for prev/next elements
     */
    function oms_check_transition_blocks() {

        $('.pageblock.transition_block').each(function () {

            // Set these to whatever you want the padding on the prev/next sections to be
            var prev_section_padding = 50;
            var next_section_padding = 50;

            // Current block
            var $transition_block    = $(this);

            // Checking the previous element.
            // If a transition block starts the page blocks off, add padding to previous element, likely a banner/header.
            var $prev_element= '';

            if ( $transition_block.prev('.pageblock').length >=1) {
                $prev_element = $transition_block.prev('.pageblock');

                if( $prev_element.hasClass('transition_block') ) {
                    $transition_block.removeClass('transition_block');
                    return true;
                }
            }


            // Checks for the next element.
            var $next_element = '';

            // If the next block is a transition block, remove the class from current transition block.
            // Maybe the next transition block will be ok
            // can't have two transition blocks next to each other.
            if ( $transition_block.next('.pageblock').length >= 1 ) {
                $next_element = $transition_block.next('.pageblock');
            }
            else if ( $transition_block.next('.site-footer').length >= 1 ) {
                $next_element = $('.site-footer');
                next_section_padding = 0;
            }
            //When the transition block is the last pageblock, and the footer is the next element of the parent
            else if ( $transition_block.next().length == 0 && $transition_block.parent().next('.site-footer') ) {
                $next_element = $('.site-footer');
                next_section_padding = 0;
            }
            else {
                $transition_block.removeClass('transition_block');
                return true;
            }

            // Reset initial values before adding the padding to offset the transition container
            if ($prev_element) {
                $prev_element.css('padding-bottom', prev_section_padding);
            }
            $transition_block.css('margin-top', '0');
            if ($next_element) {
                $next_element.css('padding-top', next_section_padding);
                $next_element.css('margin-top', '0');
            }

            // New margins and padding
            var padding_to_add       = Math.ceil($transition_block.height() / 2);
            var new_margin           = padding_to_add;
            var new_padding_prev     = prev_section_padding + padding_to_add;
            var new_padding_next     = next_section_padding + padding_to_add;

            // Element before transition block
            if ($prev_element) {
                $prev_element.css('padding-bottom', new_padding_prev);
            }

            // Transition block
            $transition_block.css('margin-top', -1 * (new_margin) );

            // Element after transition block
            if ($prev_element) {
                $next_element.css('padding-top', new_padding_next);
                $next_element.css('margin-top', -1 * new_margin);
            }
        });
    }

})(jQuery);
