var gulp        = require('gulp');
var sass        = require('gulp-sass');
var svgSprite  =  require('gulp-svg-sprite');

gulp.task('fonts', function(){
    return gulp.src([
        'node_modules/@fortawesome/fontawesome/webfonts/*.*',
        'node_modules/roboto-fontface/fonts/**'
    ]).pipe(gulp.dest('assets/fonts'));
});

gulp.task('svg:sprite', function(){
    return gulp.src('_includes/icon/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "./sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest('assets'));
});

gulp.task('scss:roboto', function() {
    return gulp.src(['node_modules/roboto-fontface/css/*.scss'])
        .pipe(gulp.dest('assets/scss/modules/roboto'));
});

gulp.task('scss:bootstrap', function() {
    return gulp.src(['node_modules/bootstrap/scss/**/*'])
        .pipe(gulp.dest('assets/scss/modules/bootstrap'));
});

gulp.task('scss:fontawesome', function() {
    return gulp.src(['node_modules/@fortawesome/fontawesome-pro/scss/**/*'])
        .pipe(gulp.dest('assets/scss/modules/fontawesome'));
});

gulp.task('scss:animate',function(){
    return gulp.src(['node_modules/animatewithsass/**/*.scss'])
        .pipe(gulp.dest('assets/scss/modules/animate'));
});

gulp.task('scss:import', gulp.series(['scss:animate','scss:bootstrap','scss:fontawesome']));

gulp.task('scss:compile', function(){
    return gulp.src(['assets/scss/*.scss'])
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest("assets/css"))
});

gulp.task('scss', gulp.series(['scss:import','scss:compile']));

gulp.task('watcher', function() {
    gulp.watch(['assets/scss/**/*.scss'], gulp.series(['scss:compile']));
});

gulp.task('default', gulp.series(['scss', 'fonts']));