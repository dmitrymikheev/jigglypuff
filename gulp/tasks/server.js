import gulp from 'gulp';
import config from '../config';
import developmentServer from '../server/development';

gulp.task('server', () => {
  gulp.watch(`${config.appDir}/images/**/*`, ['images']);
  gulp.watch(`${config.appDir}/fonts/**/*`, ['fonst']);
  gulp.watch(`${config.appDir}/src/**/*`, ['browserify']);
  gulp.watch(`${config.appDir}/styles/**/*.scss`, ['scss']);
  gulp.watch(`${config.appDir}/views/*.pug`, ['templates']);
  developmentServer();
});
