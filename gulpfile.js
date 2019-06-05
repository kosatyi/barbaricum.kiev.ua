var gulp        = require('gulp');
var sass        = require('gulp-sass');

gulp.task('fonts', function(){
    return gulp.src([
        'node_modules/@fortawesome/fontawesome/webfonts/*.*',
        'node_modules/roboto-fontface/fonts/**'
    ]).pipe(gulp.dest('assets/fonts'));
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

gulp.task('scss:import', ['scss:animate','scss:bootstrap','scss:fontawesome']);

gulp.task('scss:compile', function(){
    return gulp.src(['assets/scss/*.scss'])
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest("assets/css"))
});

gulp.task('scss', ['scss:import','scss:compile']);

gulp.task('watcher', function() {
    gulp.watch(['assets/scss/**/*.scss'], ['scss:compile']);
});

gulp.task('default', [
    'scss' ,
    'fonts'
]);