import qwest from 'qwest';
import messagesSource from 'sources/messages';

export const SET_FIELD = 'SET_FIELD';
export function setField(field, value) {
  return {
    field,
    value,
    type: SET_FIELD
  };
}

export const SUBMIT_MESSAGE = 'SUBMIT_MESSAGE';
export function submitMessage() {
  return { type: SUBMIT_MESSAGE };
}

export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export function clearMessage() {
  return {
    type: CLEAR_MESSAGE,
    message: 'Message saved to drafts',
    status: 'success'
  };
}

export const SEND_MESSAGE = 'SEND_MESSAGE';
export function sendMessage() {
  return (dispatch, getState) => {
    const message = getState().message;

    return messagesSource
      .create(message)
      .then((xhr, response) => dispatch(clearMessage()));
  };
}
