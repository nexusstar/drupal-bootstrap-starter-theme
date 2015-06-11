/**
 * @author NexusStar
 * @version 0.0.0
 * @desc STARTER-THEME Drupal theme automation
 */

var gulp = require('gulp');
var paths = require('./gulp.config.json');
var plug = require('gulp-load-plugins')();
var merge = require("merge-stream");
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var colors = plug.util.colors;
var log = plug.util.log;


/**
 * @desc Copy fontawesome
 */

gulp.task('fontawesome', function() {
    log(colors.red('Copying fontawesome fonts'));

    return gulp
        .src(paths.fontawesome)
        .pipe(gulp.dest('fonts'));
});


/**
 * @desc Compile sass files
 */

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./css/maps'))
        .pipe(gulp.dest('./css'));
});


/**
 * @desc Copy js files
 */

gulp.task('js', function(){
    log(colors.blue('Copy js files from source to theme'));

    var bootstrapJs = gulp
        .src('./lib/bootstrap/dist/js/bootstrap.js')
        .pipe(gulp.dest('js'));

    return merge(
        bootstrapJs
    );
});

/**
 * @desc Plugin JS files
 */

gulp.task('js:plugin', function(){
    log(colors.blue('Copy js plugin files from source to theme'));

    return gulp.src([                   //List all needed plugins
        './lib/PLUGIN/plugin_file.js',
        './lib/ANOTHER_PLUGIN/plugin_file.js'
    ])
        .pipe(concat('STARTER_THEME.plugins.js'))   //Change name
        .pipe(gulp.dest('./js'));
});

/**
 * @desc Watch files
 */

gulp.task('watch', function(){
    log(colors.red('## Watching files ##'));
    var sass = 'scss/**/*.scss';

    gulp
        .watch(sass, ['sass'])
        .on('change', logWatch);

    function logWatch(event) {
        log(colors.blue('*** File ' + event.path + ' was ' + event.type + ', running tasks...'));
    }

});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);