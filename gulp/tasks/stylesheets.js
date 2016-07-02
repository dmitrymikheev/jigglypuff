import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import plumber      from 'gulp-plumber';
import scss         from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import minifyCss    from 'gulp-minify-css';
import dotenv       from 'dotenv';

dotenv.load();
const dev = process.env.NODE_ENV === 'development';

gulp.task('scss',() => {
  return gulp.src('./app/assets/styles/app.scss')
    .pipe(plumber())
    .pipe(scss({
      includePaths: [
        './node_modules/foundation-sites/scss/'
      ]
    }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulpif(!dev, minifyCss()))
    .pipe(gulp.dest('./app/dist/styles/'))
});

gulp.task('images', () => {
  return gulp.src('./app/assets/images/**/*')
    .pipe(gulp.dest('./app/dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src('./app/assets/images/**/*')
    .pipe(gulp.dest('./app/dist/images'));
});
