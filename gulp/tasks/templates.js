import gulp    from 'gulp';
import plumber from 'gulp-plumber';
import jade    from 'gulp-jade';
import dotenv  from 'dotenv';

dotenv.load();
const dev = process.env.NODE_ENV === 'development';

gulp.task('templates', function() {
  return gulp.src('./app/views/**/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: dev
    }))
    .pipe(gulp.dest('./app/dist/'));
});
