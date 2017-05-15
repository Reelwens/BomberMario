/*
This gulpfile :
- Minimify images
- Concat CSS files
- Add autoprefixers
- Minimify CSS files
- Concat JS files
*/

// Configurations
var config = {
    'root': 'dist/',
    'src' : 'src/',
    'dist': 'dist/'
}


// Dependencies
var gulp          = require( 'gulp' ),
    css_nano      = require( 'gulp-cssnano' ),
    rename        = require( 'gulp-rename' ),
    plumber       = require( 'gulp-plumber' ),
    autoprefixer  = require( 'gulp-autoprefixer' ),
    concat        = require( 'gulp-concat' ),
    imagemin      = require( 'gulp-imagemin' ),
    uglify        = require( 'gulp-uglify' );



// Connect
gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});



// HTML
gulp.task('html', () => {
    return gulp.src( [
        './src/**/*.html'
        ] )
        .pipe(gulp.dest('./dist/'));
})



// Images
gulp.task('img', () => {
    return gulp.src( [
        './src/img/**/**'
        ] )
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img/'));
})



// CSS task
gulp.task( 'css', function()
{
    return gulp.src( './src/styles/*.css' )        // Get CSS files
        .pipe( concat( 'style.css' ) ) // Concat in one file
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe( css_nano() )                // Minify it
        .pipe( gulp.dest( './dist/styles/' ) );    // Put it in folder
} );




// JS task
gulp.task( 'js', function()
{
    return gulp.src( ['./src/scripts/*.js'] )        // Get JS files
        .pipe( concat( 'main.js' ) )     // Concat in one file
        .pipe( uglify() )                // Minify them (problem with ES6)
        .pipe( gulp.dest( './dist/scripts/' ) );     // Put it in folder
} );



// Watch task
gulp.task( 'watch', function()
{
    gulp.watch( './src/scss/**/**', [ 'css' ] );
    gulp.watch( './src/js/**/**', [ 'js' ] );
    gulp.watch( './src/**/*.html', [ 'html' ] );
    gulp.watch( './src/img/**/**', [ 'img' ] );
} );



gulp.task( 'default', [ 'html', 'css', 'js', 'img', 'watch' ] );