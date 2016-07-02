import gulp from 'gulp';

gulp.task('watch', function() {
  gulp.watch([ './app/assets/styles/**/*.scss'], ['scss']);
  gulp.watch([ './app/assets/scripts' + '/**/*.js'], ['browserify']);
  gulp.watch(['./app/views/**/*.jade'], ['templates']);
});
