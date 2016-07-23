import gulp       from 'gulp';
import rename     from 'gulp-rename';
import plumber    from 'gulp-plumber';
import browserify from 'browserify';
import babelify   from 'babelify';
import watchify   from 'watchify';
import source     from 'vinyl-source-stream';
import notify     from 'gulp-notify';
import dotenv     from 'dotenv';

dotenv.load();
const dev = process.env.NODE_ENV === 'development';
const entryPoint = './app/assets/src/main.js'

gulp.task('browserify', () => {
  const bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: dev,
    extensions: ['.js'],
    entries: entryPoint,
    paths: [
      './app/assets/src/'
    ]
  })
  .transform(babelify.configure({
    presets: ['es2015'],
    plugins: ['transform-decorators-legacy'],
    sourceMapRelative: 'app/'
  }));

  const bundle = () => {
    const bundleStream = bundler.bundle();

    return bundleStream
      .on('error', notify.onError())
      .pipe(source(entryPoint))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('./app/dist/src/'));
  };

  if (dev) {
    watchify(bundler).on('update', bundle);
  }
  else {
    bundler.plugin(minifyify, { map: false });
  }

  return bundle();
});
