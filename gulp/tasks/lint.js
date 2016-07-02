import gulp         from 'gulp';
import eslint       from 'gulp-eslint';
import eslintConfig from '../../config/eslint';

gulp.task('eslint', function() {
  return gulp.src('./app/assets/scripts/**/*.js')
    .pipe(eslint(eslintConfig))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
