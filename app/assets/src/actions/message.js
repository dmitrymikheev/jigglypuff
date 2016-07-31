import qwest from 'qwest';

export const SET_FIELD = 'SET_FIELD';
export function setField(field, value) {
  return {
    field,
    value,
    type: SET_FIELD
  }
}

export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
export function clearMessage() {
  return { type: CLEAR_MESSAGE }
}

export function saveMessage(message) {

}

export const SEND_MESSAGE = 'SEND_MESSAGE';
export function sendMessage() {
  return (dispatch, getState) => {
    const message = getState().message;

    return qwest.post('http://localhost:3000/emails', {
      ...message
    }).then((xhr, response) => {
      return dispatch(clearMessage());
    });
  };
}
