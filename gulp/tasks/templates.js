import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import notify from 'gulp-notify';
import config from '../config';

gulp.task('templates', function() {
  return gulp.src(`${config.appDir}/views/*.pug`)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    })).on('error', notify.onError())
    .pipe(gulp.dest(config.distDir));
});
