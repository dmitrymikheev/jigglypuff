import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import NotificationsApp from 'reducers/notifications';

const loggerMiddleware = createLogger();
const NotificationsStore = createStore(
  NotificationsApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

export default NotificationsStore;
