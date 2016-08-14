import gulp from 'gulp';
import plumber from 'gulp-plumber';
import scss from 'gulp-sass';
import notify from 'gulp-notify';
import autoprefixer from 'gulp-autoprefixer';
import config from '../config';

gulp.task('scss',() => {
  gulp.src(`${config.appDir}/styles/app.scss`)
    .pipe(plumber())
    .pipe(scss())
    .on('error', notify.onError())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(`${config.distDir}/styles/`))
});

gulp.task('images', () => {
  return gulp.src(`${config.appDir}/images/**/*`)
    .pipe(gulp.dest(`${config.distDir}/images`));
});
