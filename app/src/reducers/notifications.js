import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION
} from 'actions/notifications';

const initialState = {
  text: '',
  context: '',
  hidden: true
};

function notifications(state = initialState, action) {
  switch (action.type) {
  case SHOW_NOTIFICATION:
    return {
      ...state,
      hidden: false,
      text: action.text,
      status: action.status,
      context: action.context
    };
  case HIDE_NOTIFICATION:
    return {
      ...state,
      text: '',
      hidden: true
    };
  default:
    return state;
  }
}

export default notifications;
