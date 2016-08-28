import gulp from 'gulp';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import browserify from 'browserify';
import minifyify from 'minifyify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import notify from 'gulp-notify';
import dotenv from 'dotenv';
import config from '../config';

dotenv.load();
const dev = process.env.NODE_ENV === 'development';
const entryPoint = `./${config.appDir}/src/main.js`;

gulp.task('browserify', () => {
  const bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: dev,
    extensions: ['.js'],
    entries: entryPoint,
    paths: [
      `${config.appDir}/src`
    ]
  })
  .transform(babelify.configure({
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-decorators-legacy'],
    sourceMapRelative: config.appDir
  }));

  const bundle = () => {
    const bundleStream = bundler.bundle();

    return bundleStream
      .on('error', notify.onError())
      .pipe(source(entryPoint))
      .pipe(rename('app.js'))
      .pipe(gulp.dest(config.distDir));
  };

  if (dev) {
    watchify(bundler).on('update', bundle);
  }
  else {
    bundler.plugin(minifyify, { map: false });
  }

  return bundle();
});
