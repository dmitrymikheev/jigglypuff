import watchify from 'watchify';
import browserify from 'browserify';
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gutil from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import babelify from 'babelify';
import { assign } from 'lodash';
import config from '../config';

const customOpts = {
  entries: [`./${config.appDir}/src/main.js`],
  debug: true,
  paths: [`${config.appDir}/src`]
};
const opts = assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts));

b.transform(babelify.configure({
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-decorators-legacy'],
    sourceMapRelative: config.appDir
  }));
gulp.task('browserify', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.distDir));
}
