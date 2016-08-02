import { combineReducers } from 'redux'
import {
  REQUEST_MAIL, RECEIVE_MAILS,
  SELECT_MAIL, MARK_IMPORTANT
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
    case SELECT_MAIL:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.id) {
            return {
              ...item,
              selected: !item.selected
            };
          }
          return item;
        })
      }
    case MARK_IMPORTANT:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.selected) {
            return {
              ...item,
              important: !item.important
            };
          }
          return item;
        })
      };
    default:
      return state;
  }
}

const mailApp = combineReducers({
  mail
});

export default mailApp;
