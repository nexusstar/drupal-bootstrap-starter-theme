/**
 * @author NexusStar
 * @version 0.0.0
 * @desc Drupal starter theme automation
 */

var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var path = require('path');
var paths = require('./gulp.config.json');
var plug = require('gulp-load-plugins')();
var notify = require("gulp-notify");
var merge = require("merge-stream");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');

var colors = plug.util.colors;
var log = plug.util.log;


/**
 * @desc Copy fontawesome
 */

gulp.task('fontawesome', function() {
    log(colors.red('Copying fonts'));

    return gulp
        .src(paths.fontawesome)
        .pipe(gulp.dest('fonts'));
});

/**
 * @desc Compile less files
 */


gulp.task('less', function(){
    log(colors.blue('Compile style.css file from less'))

    return gulp.src('less/style.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        //.pipe(minifyCSS())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('css'));
});

gulp.task('less:bootstrap',function(){
    log(colors.blue('Compile bootstrap.css file from less'))

    return gulp.src('less/bootstrap.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        //.pipe(minifyCSS())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('css'));
});

gulp.task('less:tonicons',function(){
    log(colors.blue('Compile tonicons.css file from less'))

    return gulp.src('less/tonicons.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('css'));
});

gulp.task('less:fontawesome',function(){
    log(colors.blue('Compile font-awesome.css file from less'))

    return gulp.src('less/font-awesome.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('css'));
});

gulp.task('less:switch',function(){
    log(colors.blue('Compile bootstrap-switch.css file from less'))

    return gulp.src('less/font-awesome.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('css'));
});

/**
 * @desc Copy js files
 */

gulp.task('js', function(){
    log(colors.blue('Copy js files from source to stage'));

    var bootstrapJs = gulp
        .src('./lib/bootstrap/dist/js/bootstrap.js')
        .pipe(gulp.dest('js'));

    return merge(
        bootstrapJs
    );
});


/**
 * @desc Watch files
 */

gulp.task('watch', function(){
    log(colors.red('Watching files'));
    var less = 'less/**/*.less';

    gulp
        .watch(less, ['less'])
        .on('change', logWatch);

    function logWatch(event) {
        log(colors.blue('*** File ' + event.path + ' was ' + event.type + ', running tasks...'));
    }

});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);