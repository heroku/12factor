(function ($) {

    $(document).ready( function () {

        // Mega Menu Toggle
        var hoverTimeout;

        $('.mega-menu-wrap li.dropdown, .mega-menu-wrap li.mega-menu-flyout').hover(function() {

            clearTimeout(hoverTimeout);
            $('li.dropdown').removeClass('mega-toggle-on');
            $('body').addClass('mega-menu-open');
            $(this).addClass('mega-toggle-on');

        }, function() {

            var $this = $(this);

            hoverTimeout = setTimeout(function() {
                $('body').removeClass('mega-menu-open');
                $(this).removeClass('mega-toggle-on');
                $this.removeClass('mega-toggle-on');
                $('li.dropdown').removeClass('mega-toggle-on');
            }, 300);

        });

        // Mega Menu Toggle
        $('.mega-menu-wrap li.menu-item-has-children').each( function () {

            $(this).hover(
                function () {
                    $(this).find('a').attr('aria-expanded', 'true');
                    $(this).find('ul.mega-menu-container').addClass('show');
                },
                function () {
                    $(this).find('a').attr('aria-expanded', 'false');
                    $(this).find('ul.mega-menu-container').removeClass('show');
                }
            );

        });

        $( '.navbar-toggler' ).on( "click", function (e) {
            $('body').toggleClass('mega-menu-open');
        });

        // Mobile Menu Toggle
        $( '#mobile-close-wrapper' ).on( 'click', function () {
            $( '.navbar-toggle' ).removeClass( 'collapsed' );
        } );

        // Mobile Menu Carets
        $( '#mobile-top-nav [data-toggle="dropdown"]' ).on( "click", function (e) {
            e.stopPropagation();
            $(this).parent().toggleClass( 'open' );
            $(this).toggleClass( 'open' );

            $(this).find('.text').text(function(i, text){
                return text === "Expand Sub Links" ? "Collapse Sub Links" : "Expand Sub Links";
            })

            $(this).attr('aria-expanded', function(index, attr){
                return attr == 'false' ? 'true' : 'false';
            });
        } );

        // Auto-open current and parent menu items on mobile/tablet.
        if ( $( window ).width() < 992 ) {
            $( '#mobile-top-nav .current-menu-ancestor.dropdown' ).each( function () {
                $(this).addClass( 'show' );
            } );

            $( '#mobile-top-nav .current-menu-ancestor.dropdown' ).each( function () {
                $(this).addClass( 'show' );
            } );
        }

        var current_menu_parent = $( '.current-menu-parent' );
        // Adds menu class for grandparent menu item
        if ( current_menu_parent.length > 0 ) {
            current_menu_parent.parents( '.menu-item-has-children' ).addClass( 'current-menu-ancestor current_menu_ancestor' );
        }

        // Table of Contents Menu
        $(document).on('click', '#toc-nav a', function() {
            $('#toc-nav').removeClass('show');
            $('#post-menu-trigger').removeClass('open');
        });

        // Floating Labels
        setTimeout( function () {
            $('#newsletter-form, .filters .facet-type-search, .form-fields .field').each(function() {

                var $input = $(this).find('input[type="text"], input[type="email"], input[type="number"], input[type="password"], input[type="tel"], textarea');
                var $label = $(this).find('label');

                $input.blur(function() {
                    if($input.val() == '') {
                        $label.removeClass('focused');
                    }
                }).focus(function() {
                    $label.addClass('focused');
                });

                if($input.val()) {
                    $label.addClass('focused');
                }

            });
        }, 1000 );

        // Facets
        // Checkboxes
        $('.facet__checkbox').on('click', function() {
            $(this).toggleClass('checked');
        });

        // Radio buttons
        $('.facet__radio').on('click', function() {
            $(this).closest('.facet').find('.facet__radio').not(this).removeClass('checked').attr('aria-checked', false);
            $(this).toggleClass('checked').attr('aria-checked', true);
        });

        // Multi Select / fselect
        $('.fs-wrap').on('click', function() {
            $(this).toggleClass('fs-open').attr('aria-haspopup', true).attr('aria-expanded', true);
            $(this).closest('.facet-type__fselect').toggleClass('open');

            if( $(this).hasClass('fs-open') ) {
                $(this).closest('.facet-type__fselect').find('.fs-dropdown').removeClass('fs-hidden');
            } else {
                $(this).closest('.facet-type__fselect').find('.fs-dropdown').addClass('fs-hidden');
            }
        });

        // View more
        $('.show-more-content').hide();
        $('.view-more').click(function(){
            $(this).closest('.facet').find('.view-more-content').show(200);
            $(this).closest('.facet').find('.view-less').show();
            $(this).closest('.facet').find('.view-more').hide();
        });

        // View less
        $('.view-less').click(function(){
            $(this).closest('.facet').find('.view-more-content').hide(150);
            $(this).closest('.facet').find('.view-more').show();
            $(this).closest('.facet').find('.view-less').hide();
        });

        // Select all / Deselect all
        $('.select-all').click(function () {
            if( $(this).hasClass('deselect') ) {
                $(this).html('Select All').removeClass('deselect').attr('aria-pressed', 'false');
                $(this).closest('.facet').find('.facet__checkbox').removeClass('checked').attr('aria-checked', 'false');
            } else {
                $(this).html('Deselect All').addClass('deselect').attr('aria-pressed', 'true');
                $(this).closest('.facet').find('.facet__checkbox').addClass('checked').attr('aria-checked', 'true');
            }
        });

        // Add/Remove Buttons
        $('.btn-action').click(function () {
            if( $(this).hasClass('remove') ) {
                $(this).html('Add Doc').removeClass('remove').addClass('add').attr('aria-pressed', 'false');
            } else {
                $(this).html('Remove').removeClass('add').addClass('remove').attr('aria-pressed', 'true');
            }
        });

        // Predictive Search Dropdown
        $('input.search').on('input', function() {
            $('.predictive-search').addClass('open');
        });

        $('input.search').blur(function() {
            if( $(this).val().length === 0 ) {
                $('.predictive-search').removeClass('open');
            }
        });

        // Close the dropdown with the escape key
        $(document).on( 'keyup', function (e) {
            if ( $('.predictive-search').hasClass('open') ) {
                if ( e.key == 'Escape' ) {
                    $('.predictive-search').removeClass('open');
                }
            }
        } );

    } );// End document.ready

    $(window).on('load', function() {
      // Init full calendar, if present on page
      var fullCal = document.getElementById('full-calendar');
      if ( fullCal ) {
        var calendar = new FullCalendar.Calendar(fullCal, {
          themeSystem: 'bootstrap5',
          buttonIcons: {
            prev: 'caret-left-fill',
            next: 'caret-right-fill'
          },
          buttonText: {
            today:    'Today',
            month:    'Month',
            week:     'Week',
            day:      'Day',
            list:     'List'
          },
          initialView: 'dayGridWeek',
          height: 'auto',
          headerToolbar: {
            start: 'title',
            end: 'dayGridWeek,dayGridMonth prev,today,next'
          },
          events: fcevents,
          views: {
            dayGridMonth: {
              weekends: true,
              fixedWeekCount: false,
              showNonCurrentDates: false,
            },
            dayGridWeek: {
              weekends: false
            }
          }
        });

        calendar.render();
      }
    });

    // Logged In Menu
    $(window).on('load resize scroll', function() {

        right = '';

        if($('body').hasClass('logged-in')) {

            if($(window).width() < 1300) {
                var right = $('.primary-mobile .location-delimiter').offset().left;
            } else {
                var right = $('.primary-desktop .location-delimiter').offset().left;
            }

            var distance = Math.round(right) + 'px';

            // Set the background color
            $('body.logged-in .site-header-bottom').css({'background': 'linear-gradient(90deg, white ' + distance + ', #F5F8FB ' + distance + ')'});

        }

    });

    // Init full calendar
    /*function init_full_calendar( id ) {
      var calendars;
      var fCals = $('.js-fullcalendar');
      if ( fCals.length > 0 ) {
        fCals.forEach( function(el, i, arr) {

        });
      }
      var calendarEl = document.getElementById(id);
      var calendar = new FullCalendar.Calendar(calendarEl, {
        themeSystem: 'bootstrap5'
      });

      calendar.render();
    }*/

})( jQuery );
