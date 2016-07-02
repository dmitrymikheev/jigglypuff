import gulp from 'gulp';
import clean from 'gulp-clean';

gulp.task('default', ['browserify', 'express', 'scss', 'images', 'fonts', 'templates', 'watch']);

gulp.task('build', ['clean', 'scss', 'images', 'fonts', 'templates', 'browserify']);
