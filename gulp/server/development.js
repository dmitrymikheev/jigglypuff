import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import jsonServer from 'json-server';
import config from '../config';

export default () => {
  const port = process.env.PORT;
  const server = browserSync.create();

  server.init({
    port,
    open: false,
    notify: false,
    server: {
      baseDir: config.distDir,
      middleware: [
        historyApiFallback()
      ]
    },
    files: [
      `${config.distDir}/**/*`
    ]
  });
};
