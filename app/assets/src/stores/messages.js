import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import MessagesApp from 'reducers/messages';

const loggerMiddleware = createLogger();
const MessageStore = createStore(
  MessagesApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

export default MessageStore;
