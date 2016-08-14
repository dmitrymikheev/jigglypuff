import gulp from 'gulp';
import runSequence from 'run-sequence';
import config from '../config';

gulp.task('build', (callback) => {
  runSequence(
    'images',
    'templates',
    'scss',
    'browserify',
    callback
  );
});
