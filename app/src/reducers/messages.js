import {
  MAKE_REQUEST,
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
  SELECT_MESSAGE,
  MARK_IMPORTANT,
  HIDE_NOTIFICATION
} from 'actions/messages';
import {
  updateMessage,
  deleteMessage,
  toggleMessageField
} from 'helpers/messages';

const initialState = {
  items: [],
  message: {},
  isFetching: false,
  receiveEmpty: false,
  messageType: 'inbox'
};

function messages(state = initialState, action) {
  switch (action.type) {
  case MAKE_REQUEST:
    return {
      ...state,
      messageType: action.messageType,
      isFetching: true
    };
  case RECEIVE_MESSAGES:
    return {
      ...state,
      isFetching: false,
      receiveEmpty: !action.items.length,
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
      items: updateMessage(state.items, action.message)
    };
  case DELETE_MESSAGE:
    return {
      ...state,
      items: deleteMessage(state.items, action.id)
    };
  case SELECT_MESSAGE:
    return {
      ...state,
      items: toggleMessageField(state.items, 'selected', action.id)
    };
  case MARK_IMPORTANT:
    return {
      ...state,
      items: toggleMessageField(state.items, 'important', action.id)
    };
  default:
    return state;
  }
}

export default messages;
