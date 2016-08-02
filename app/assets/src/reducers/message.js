import { combineReducers } from 'redux'
import Storage from 'services/storage';
import {
  SEND_MESSAGE, SET_FIELD, CLEAR_MESSAGE
} from 'actions/message';

const initialState = {
  type: 'drafts',
  title: Storage.get('title') || '',
  message: Storage.get('message') || ''
}

function message(state = initialState, action) {
  switch (action.type) {
    case SET_FIELD:
      Storage.set(action.field, action.value);

      return {
        ...state,
        [action.field]: action.value
      };
    case SEND_MESSAGE:
      return state;
    case CLEAR_MESSAGE:
      Storage.clear();

      return initialState;
    default:
      return state;
  }
}

const messageApp = combineReducers({
  message
});

export default messageApp;
