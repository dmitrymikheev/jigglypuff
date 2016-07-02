import gulp from 'gulp';

gulp.task('clean', function() {
  return gulp.src(['!./app/dist/vendors/', './app/dist/*'])
        .pipe(clean());
});
