/**
 * This gulp script used to compile and minify CSS and JavaScript.
 *
 * This gulp script requires Node v18.x. If you're using NVM (Node Version
 * Manager), and you should be, then you can run `nvm use 18`.
 *
 * You can run the default task to watch for changes to all files (Level 1
 * Developer) or you can run each task independently for more granular control
 * (Level 100 Developer).
 *
 * By default this gulp script will compile and minify CSS and JavaScript (ie,
 * it will create production-ready files). To use unminified CSS and CSS maps
 * (ie, development-only files), use the `--dev` argument.
 *
 * To run the default task, simply type `gulp` and hit enter.
 *
 * @todo One day it might make sense to compile both production-ready and
 *   development files and have a setting in the CMS backend that can toggle
 *   between each set. Will attempt in Drupal sandbox and report back.
 *   <3 Jimmy
 *
 * Options:
 *
 * --dev
 *   Includes maps when compiling CSS. Doesn't minify compiled files. Applies to both JS and CSS tasks.
 *
 * --quiet
 *   Compile notifications will not be displayed. Applies to both JS and CSS tasks.
 *
 * Usage:
 *
 * - gulp css|js [--dev] [--quiet]
 *
 * CSS Examples:
 *
 * - `gulp css`
 *   This command will watch the SASS input directory for any file
 *   changes and automatically run the appropriate CSS tasks.
 *
 * - `gulp css --quiet`
 *   This command will perform the same actions as the above command
 *   but won't show a notification upon completion.
 *
 * - `gulp css --dev`
 *   This command will produce unminified CSS files and maps that can
 *   be used during development.
 *
 * JavaScript Examples:
 *
 * - `gulp js`
 *   This command will watch the JS input directories for any file
 *   changes and automatically run the appropriate JS tasks.
 *
 * - `gulp js --quiet`
 *   This command will perform the same actions as the above command
 *   but won't show a notification upon completion.
 *
 * - `gulp compile-js-combine`
 *   This command will combine all JS files in the `src` directory into
 *   a single file called `combined[.min].js`.
 *
 * - `gulp compile-js-nocombine`
 *   This command won't do anything because the `dist` versions would
 *   be the same as the `src` versions.
 *
 * References:
 *
 * - Dart Sass: https://github.com/sass/dart-sass/blob/main/README.md#javascript-api
 */

'use strict';

const concat = require('gulp-concat');
const extReplace = require('gulp-ext-replace');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const sass = require('gulp-sass')(require('sass'));
const stripCssComments = require('gulp-strip-css-comments');
const uglify = require('gulp-uglify-es').default;
const util = require('gulp-util');
var cssError = false;

// Notifications can be disabled by passing the `--quiet flag`.
// Files are automatically minified unless the --dev flag is passed.
const config = {
    dev: util.env.dev,
    quiet: util.env.quiet,
};

const cssFiles = {
    inputPattern: 'resources/scss/**/*.scss',
    outputDirectory: 'resources/css/',
    devOutputDirectory: 'resources/css',
    mapsDirectory: 'maps',
}

const jsFiles = {
    inputPattern: 'resources/js/src/**/*.js',
    nocombineInputPattern: 'resources/js/nocombine/**/*.js',
    outputDirectory: 'resources/js/dist/min',
    devOutputDirectory: 'resources/js/dist',
}

/**
 * Gets the current environment ("DEV" or "PROD") based on the
 * presence of the `--dev` parameter.
 *
 * @returns {string}
 */
function getEnvironment() {
    return config.dev ? 'DEV' : 'PROD';
}

exports.getEnvironment = getEnvironment;

/**
 * Command: gulp [--dev] [--quiet]
 *
 * Run this command if you want to automagically compile CSS and JS
 * whenever an SCSS or JS file is changed.
 */
gulp.task('default', () => {
    return gulp.watch([cssFiles.inputPattern, jsFiles.inputPattern, jsFiles.nocombineInputPattern], {delay: 500}, gulp.series('compile-css', 'compile-js-combine', 'compile-js-nocombine', 'default-notification'));
});

// ============================== //
// CSS
// ============================== //

/**
 * Command: gulp css [--dev] [--quiet]
 *
 * Run this command if you want to automagically compile CSS whenever
 * an SCSS file is changed.
 */
gulp.task('css', () => {
    return gulp.watch(cssFiles.inputPattern, {delay: 500}, gulp.series('compile-css', 'compile-css-notification'));
});

/**
 * Run this command if you want to compile on-demand. Same parameters
 * as the watch task.
 */
gulp.task('compile-css', function () {
    // Using the `--dev` flag results in unminified CSS with sourcemaps.
    if (config.dev) {
        return gulp.src(cssFiles.inputPattern, { sourcemaps: true })
            .pipe(sass.sync({outputStyle: 'expanded'}).on('error', function(error){
                cssError = true;
                console.log(error.messageFormatted);
                this.emit('end');
            }))
            .pipe(gulp.dest(cssFiles.devOutputDirectory, { sourcemaps: true }));
    }

    // Not using the `--dev` flag results in minified CSS and no sourcemaps.
    return gulp.src(cssFiles.inputPattern)
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', function(error){
            cssError = true;
            console.log(error.messageFormatted);
            this.emit('end');
        }))
        .pipe(extReplace('.min.css'))
        .pipe(stripCssComments({preserve: false, whitespace: false}))
        .pipe(gulp.dest(cssFiles.outputDirectory));
});

// ============================== //
// JavaScript
// ============================== //

/**
 * Command: gulp js [--dev] [--quiet]
 *
 * Run this command if you want to automagically compile JS whenever
 * a JS file is changed.
 */
gulp.task('js', () => {
    return gulp.watch([jsFiles.inputPattern, jsFiles.nocombineInputPattern], {delay: 500}, gulp.series('compile-js-combine', 'compile-js-nocombine', 'compile-js-notification'));
});

/**
 * Run this command if you want to compile on-demand. Same parameters
 * as the watch task.
 */
gulp.task('compile-js-combine', function () {
    // Using the `--dev` flag results in unminified JavaScript.
    if (config.dev) {
        return gulp.src(jsFiles.inputPattern)
            .pipe(concat('combined.js'))
            .pipe(gulp.dest(jsFiles.devOutputDirectory));
    }

    // Not using the `--dev` flag results in minified JavaScript.
    return gulp.src(jsFiles.inputPattern)
        .pipe(concat('combined.min.js'))
        .pipe(uglify()).on('error', function (err) {
            console.log(err);
        })
        .pipe(gulp.dest(jsFiles.outputDirectory));
});

/**
 * Run this command if you want to compile on-demand. Same parameters
 * as the watch task.
 */
gulp.task('compile-js-nocombine', function () {
    // Using the `--dev` flag results in unminified JavaScript.
    if (config.dev) {
        console.log('[Gulpfile.js] Not creating dist versions of nocombine files because they would be the same as the src versions.');
        return false;
    }

    // Not using the `--dev` flag results in minified JavaScript.
    return gulp.src(jsFiles.nocombineInputPattern)
        .pipe(uglify()).on('error', function (err) {
            console.log(err);
        })
        .pipe(extReplace('.min.js'))
        .pipe(gulp.dest(jsFiles.outputDirectory + '/nocombine'));
});

// ============================== //
// Notifications
// ============================== //

// Please do not call any of these tasks directly because the
// internet may implode in upon itself as a result.

gulp.task('default-notification', function () {
    const tempCssError = cssError;
    cssError = false;

    return gulp.src([cssFiles.inputPattern, jsFiles.inputPattern])
        .pipe(gulpif(!tempCssError, notify({onLast: true, message: 'Files Compiled (' + getEnvironment() + ')'})))
        .pipe(gulpif(tempCssError, notify({onLast: true, message: 'CSS Compile Error', type: 'error'})));
});

gulp.task('compile-css-notification', function () {
    return gulp.src(cssFiles.inputPattern)
        .pipe(gulpif(!config.quiet, notify({onLast: true, message: 'CSS Compiled (' + getEnvironment() + ')'})));
});

gulp.task('compile-js-notification', function () {
    return gulp.src(jsFiles.inputPattern)
        .pipe(gulpif(!config.quiet, notify({onLast: true, message: 'JS Compiled (' + getEnvironment() + ')'})));
});