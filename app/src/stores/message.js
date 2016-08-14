import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import messageApp from 'reducers/message';

const loggerMiddleware = createLogger();
let messageStore = createStore(
  messageApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

export default messageStore;
