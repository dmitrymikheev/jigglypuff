import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import MessageApp from 'reducers/message';

const loggerMiddleware = createLogger();
const MessageStore = createStore(
  MessageApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

export default MessageStore;
