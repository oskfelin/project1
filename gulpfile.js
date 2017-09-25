var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');


gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('start', ['browserSync'], function (){
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/style/*.css', browserSync.reload);
});


gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
});


gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('build'))
});

gulp.task('clean:build', function() {
    return del.sync('build');
});

gulp.task('build', function (callback) {
    runSequence('clean:build',
        ['useref', 'images'],
        callback
    )
});