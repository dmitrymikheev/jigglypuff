import qwest from 'qwest';
import { omit } from 'lodash';

export const REQUEST_MAIL = 'REQUEST_MAIL';
export function requestMails() {
  return { type: REQUEST_MAIL };
}

export const RECEIVE_MAILS = 'RECEIVE_MAILS';
export function receiveMails(items) {
  return {
    items,
    type: RECEIVE_MAILS
  };
}

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export function receiveMessage(message) {
  return {
    message,
    type: RECEIVE_MESSAGE
  }
}

export const RECEIVE_MAIL = 'RECEIVE_MAIL';
export function receiveMail(mail) {
  return {
    mail,
    type: RECEIVE_MAIL
  }
}

export const SELECT_MAIL = 'SELECT_MAIL';
export function selectMail(id) {
  return {
    id,
    type: SELECT_MAIL
  };
}

export const MARK_IMPORTANT = 'MARK_IMPORTANT';
export function markImportant() {
  return {
    type: MARK_IMPORTANT
  };
}

export const DELETE_MAIL = 'DELETE_MAIL';
export function deleteMailFromStore(id) {
  return {
    id,
    type: DELETE_MAIL
  };
}

export function fetchMails(type) {
  return dispatch => {
    dispatch(requestMails());

    return qwest.get('http://localhost:3000/emails', {
      type
    })
     .then((xhr, response) => {
        return dispatch(receiveMails(response));
     });
  };
}

export function fetchMessage(id) {
  return dispatch => {
    dispatch(requestMails());

    return qwest.get(`http://localhost:3000/emails/${id}`)
      .then((xhr, response) => {
        return dispatch(receiveMessage(response));
      })
  };
}

export function shouldFetchMails(state, type) {
  const items = state.mail.items;
  if (!items.length && !state.mail.isFetching) {
    return true;
  } else if (items.length && !state.mail.isFetching) {
    return items.some(item => item.type !== type)
  }

  return false;
}

export function fetchMailsIfNeed(type) {
  return (dispatch, getState) => {
    if (shouldFetchMails(getState(), type)) {
      return dispatch(fetchMails(type));
    }
  };
}

export function shouldFetchMessage(state, id) {
  const message = state.mail.message;

  if (!message.id && !state.mail.isFetching) {
    return true;
  } else if (message.id && !state.mail.isFetching) {
    return message.id !== parseInt(id);
  }

  return false;
}

export function fetchMessageIfNeed(id) {
  return (dispatch, getState) => {
    if (shouldFetchMessage(getState(), id)) {
      return dispatch(fetchMessage(id));
    }
  }
}

export function markAsImportantIfNeed() {
  return (dispatch, getState) => {
    const selectedMails = getState().mail.items.filter(item => item.selected);

    if (selectedMails.length) {
      return dispatch(markAsImportant(selectedMails));
    }
  };
}

export function markAsImportant(emails) {
  emails = emails.map(mail => {
    return {
      ...mail,
      important: true
    };
  });

  return dispatch => {
    emails.forEach(email => {
      email = omit(email, 'selected');

      qwest.post('http://localhost:3000/emails', {
        ...email
      }).then((xhr, response) => {
        dispatch(receiveMail(response));
      });
    });
  };
}

export function deleteIfNeed() {
  return (dispatch, getState) => {
    const selectedMails = getState().mail.items.filter(item => item.selected);

    if (selectedMails.length) {
      return dispatch(deleteMails(selectedMails));
    }
  }
}

export function deleteMails(emails) {
  return dispatch => {
    emails.map(email => {
      qwest.delete(`http://localhost:3000/emails/${email.id}`)
      .then((xhr, response) => {
        dispatch(deleteMailFromStore(email.id));
      });
    });
  }
}
