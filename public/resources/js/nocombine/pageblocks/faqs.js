/**
 * FAQs expand/collapse all.
 */
(function($) {
    $(document).ready(function() {
        // toggles ALL faq containers open/closed in this block.
        $(document).on('click', '.js-faqs-collapse', function() {
            $(this).closest('.pageblock--oms-faqs').find('.js-faq-answer').collapse('hide');
        });

        $(document).on('click', '.js-faqs-expand', function() {
            $(this).closest('.pageblock--oms-faqs').find('.js-faq-answer').collapse('show');
        });
    });
})(jQuery);