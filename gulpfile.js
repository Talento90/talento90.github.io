var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');

var cssFiles = ['css/style.css'];
var jsFiles = ['js/main.js'];

var jsVendors = [
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/bootstrap-material-design/dist/bootstrap-material-design.iife.min.js',
    './node_modules/jquery/dist/jquery.min.js'
    ];
    
var cssVendors = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/bootstrap-material-design/dist/bootstrap-material-design.min.css'
    ];
    
var fontVendors = [
    './node_modules/bootstrap/dist/fonts/**.*',
    ];

gulp.task('vendors', () => {
  gulp.src(jsVendors).pipe(gulp.dest('./js'))
  gulp.src(cssVendors).pipe(gulp.dest('./css'))
  gulp.src(fontVendors).pipe(gulp.dest('./fonts'))
});

gulp.task('css', () => {
    return gulp.src(cssFiles)
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', () => {
  gulp.src(jsFiles)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "."
        },
        browser: "chrome"
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['vendors', 'css', 'js', 'browser-sync'], () => {
    gulp.watch("css/*/*.css", ['css']);
    gulp.watch("js/*.js", ['js']);
    gulp.watch("index.html", ['bs-reload']);
});