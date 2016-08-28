import gulp from 'gulp';
import config from '../config';

gulp.task('template', () => {
  return gulp.src(`${config.appDir}/index.html`)
    .pipe(gulp.dest(`${config.distDir}`));
});
