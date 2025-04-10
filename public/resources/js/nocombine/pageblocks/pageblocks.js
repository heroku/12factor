/**
 * Creates an observer to add the in-view class to blocks.
 *
 * @author Orbit Media Studios
 */
if( !! window.IntersectionObserver ) {

    const options = {
        //threshold : 0.25 // Percentage of the element is in view.
        rootMargin: '0px 0px -200px 0px' // distance from bottom window
    }

    let observer = new IntersectionObserver(
      ( entries, observer ) => {
          entries.forEach( entry => {

              // Checks if the element is actually intersecting.
              if ( entry.isIntersecting ) {

                  // Adds 'active' class to the parent element.
                  entry.target.classList.add( 'active' );
              }

          } );
      }, options );

    document.querySelectorAll( '.pageblock' ).forEach( block => {
        observer.observe( block );
    } );

} else {

    // Fallback (IE11). Just sets active on all columns on load.
    var pageblocks = document.querySelectorAll( '.pageblock' );
    [].forEach.call(pageblocks, function(pageblock) {
        pageblock.classList.add('active')
    });

}