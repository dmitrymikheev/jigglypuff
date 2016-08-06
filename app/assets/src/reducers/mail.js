import { combineReducers } from 'redux'
import {
  REQUEST_MAIL, RECEIVE_MAILS, RECEIVE_MAIL, DELETE_MAIL,
  SELECT_MAIL, MARK_IMPORTANT
} from 'actions/mail';
import { reject } from 'lodash';

const initialState = {
  isFetching: false,
  items: []
};

function mail(state = initialState, action) {
  switch (action.type) {
    case REQUEST_MAIL:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_MAILS:
      return {
        ...state,
        isFetching: false,
        items: action.items
      };
    case RECEIVE_MAIL:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.mail.id) {
            return action.mail;
          }
          return item;
        })
      };
    case DELETE_MAIL:
      return {
        ...state,
        items: reject(state.items, ['id', action.id])
      };
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
      };
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
