import { combineReducers } from 'redux'
import {
  SEND_MESSAGE, SET_FIELD, CLEAR_MESSAGE
} from 'actions/message';

const initialState = {
  type: 'drafts',
  title: '',
  message: ''
}

function message(state = initialState, action) {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value
      };
    case SEND_MESSAGE:
      return state;
    case CLEAR_MESSAGE:
      return initialState;
    default:
      return state;
  }
}

const messageApp = combineReducers({
  message
});

export default messageApp;
