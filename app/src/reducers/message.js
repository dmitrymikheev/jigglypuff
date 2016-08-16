import { combineReducers } from 'redux';
import Storage from 'services/storage';
import {
  SEND_MESSAGE, SET_FIELD, CLEAR_MESSAGE, SUBMIT_MESSAGE
} from 'actions/message';

const initialState = {
  type: 'drafts',
  title: Storage.get('title') || '',
  body: Storage.get('body') || '',
  submitted: false
};

function message(state = initialState, action) {
  switch (action.type) {
  case SET_FIELD:
    Storage.set(action.field, action.value);
    return {
      ...state,
      [action.field]: action.value
    };
  case SEND_MESSAGE:
    return {
      ...state,
      submitted: true
    };
  case SUBMIT_MESSAGE:
    return {
      ...state,
      submitted: true
    };
  case CLEAR_MESSAGE:
    Storage.clear();
    return initialState;
  default:
    return state;
  }
}

function notification(state = {}, action) {
  switch (action.type) {
  case CLEAR_MESSAGE:
    return {
      ...state,
      message: action.message,
      status: action.status,
      isHidden: false
    };
  default:
    return state;
  }
}

const messageApp = combineReducers({
  message,
  notification
});

export default messageApp;
