import { combineReducers } from 'redux'
import {
  REQUEST_MAIL, RECEIVE_MAILS
} from 'actions/mail';

const initialState = {
  isFetching: false,
  items: []
};

function mail(state = initialState, action) {
  switch (action.type) {
    case REQUEST_MAIL:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_MAILS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items
      })
    default:
      return state;
  }
}

const mailApp = combineReducers({
  mail
});

export default mailApp;
