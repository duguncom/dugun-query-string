var gulp = require('gulp');
var gulpConcat = require('gulp-concat');

gulp.task('compress', function() {
    console.info('Compressing scripts');
    var source = [
        'src/query-string.module.js',
        'src/query-string.service.js',
    ];

    return gulp.src(source)
        .pipe(gulpConcat('dugun-query-string.js'))
        .pipe(gulp.dest('dist/'));
});
