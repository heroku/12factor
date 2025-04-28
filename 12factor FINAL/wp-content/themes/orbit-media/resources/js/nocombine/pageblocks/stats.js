/**
 * Animating the number counter starts with checking on scroll
 *
 * @author Orbit Media Studios
 */

/*
* Utility to get number of decimals so we can set a fixed decimal place for each number.
 */
function numDec( n ) {
    return n % 1 == 0 ? 0 : ("" + n).length - ("" + n).lastIndexOf( "." ) - 1
}

if( !! window.IntersectionObserver ) {

    const options = {
        rootMargin: '0px 0px -200px 0px' // distance from bottom window
    }

    let observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach( function(entry) {
            if (entry.isIntersecting) {

                if ( ! entry.target.classList.contains('animated-stats') ) {
                    entry.target.classList.add('animated-stats');

                    // Loops through all numbers in this block.
                    const stats = entry.target.querySelectorAll( '.js-stat' );
                    stats.forEach( animateCountUp );
                }

            }
        });
    }, options);

    // Observe each counter page block.
    document.querySelectorAll('.pageblock--oms-counter.animated_stats').forEach( function(counter) { observer.observe(counter) });


    // Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
    const frameDuration = 1000 / 60;

    // How long you want the animation to take, in ms
    const animationDuration = 2000;

    // Use that to calculate how many frames we need to complete the animation
    const totalFrames = Math.round( animationDuration / frameDuration );

    // An ease-out function that slows the count as it progresses
    const easeOutQuad = t => t * ( 2 - t );

    // The animation function, which takes an Element
    // @see https://jshakespeare.com/simple-count-up-number-animation-javascript-react/
    const animateCountUp = stat => {
        // Get the number in the .value element
        let statValue = stat.querySelector('.js-stat-value');
        // Use the data-count attribute for the end number.
        let countTo;

        if ( stat.dataset.count.includes('.') ) {
            countTo = parseFloat( stat.dataset.count );
        } else {
            countTo = parseInt( stat.dataset.count, 10);
        }
        let frame = 0;

        //Start the animation running 60 times per second
        const counter = setInterval( () => {
            frame++;

            // Calculate our progress as a value between 0 and 1
            // Pass that value to our easing function to get our
            // progress on a curve
            const progress = easeOutQuad( frame / totalFrames );

            // Use the progress value to calculate the current count
            let currentCount;
            // Checks for a decimal point. This is fixed to 1 place after the decimal, but can be updated.
            if ( countTo.toString().includes( '.' ) ) {
                currentCount = parseFloat( countTo * progress ).toFixed(numDec(countTo));
            } else {
                currentCount = Math.round( countTo * progress );
            }

            // If the current count has changed, update the element
            if ( parseInt( statValue.innerHTML, 10 ) !== currentCount ) {
                statValue.innerHTML = commaSeparateNumber(currentCount);
            }

            // If we’ve reached our last frame, stop the animation
            if ( frame === totalFrames ) {
                clearInterval( counter );
                statValue.innerHTML = commaSeparateNumber(stat.dataset.count);
            }
        }, frameDuration );
    };

    /**
     * Adds the comma into the number, if needed.
     *
     * @param val
     * @returns {*}
     */
    function commaSeparateNumber(val) {
        while (/(\d+)(\d{3})/.test(val.toString())) {
            val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
        }
        return val;
    }
}