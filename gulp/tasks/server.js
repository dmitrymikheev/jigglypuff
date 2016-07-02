import gulp   from 'gulp';
import server from 'gulp-express';

gulp.task('express', function() {
  server.run(['server.js']);
});
