import { combineReducers } from 'redux'
import {
  MAKE_REQUEST, RECEIVE_MESSAGES, RECEIVE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE,
  SELECT_MESSAGE, MARK_IMPORTANT
} from 'actions/messages';
import { reject } from 'lodash';

const initialState = {
  isFetching: false,
  items: [],
  message: {}
};

function messages(state = initialState, action) {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_MESSAGES:
      return {
        ...state,
        isFetching: false,
        items: action.items
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.message.id) {
            return action.message;
          }
          return item;
        })
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        items: reject(state.items, ['id', action.id])
      };
    case SELECT_MESSAGE:
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

const MessagesApp = combineReducers({
  messages
});

export default MessagesApp;
