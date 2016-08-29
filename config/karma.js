import config from '../gulp/config';

export default {
  basePath: process.cwd(),
  frameworks: [
    'mocha',
    'browserify',
    'chai',
    'sinon'
  ],
  client: {
    mocha: { ui: 'bdd' }
  },
  port: 5000,
  singleRun: true,
  browsers: ['PhantomJS'],
  files: [
    'test/*.js'
  ],
  reporters: ['dots'],
  colors: true,
  preprocessors: {
    'test/*.js': ['browserify']
  },
  plugins: [
    'karma-mocha',
    'karma-chai',
    'karma-sinon',
    'karma-browserify',
    'karma-phantomjs-launcher'
  ],
  browserify: {
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: true,
    paths: [`${config.appDir}/src`],
    transform: [
      [
        'babelify',
        {
          presets: ['es2015', 'stage-0'],
          plugins: ['babel-plugin-transform-decorators-legacy']
        }
      ]
    ]
  }
};
