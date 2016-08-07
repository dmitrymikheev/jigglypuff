import qwest from 'qwest';
import messagesSource from 'sources/messages';
import { shouldFetchMessages, shouldFetchMessage } from 'helpers/messages';
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

    messagesSource.fetch(type).then(messages => dispatch(receiveMails(messages)));
  };
}

export function fetchMessage(id) {
  return dispatch => {
    dispatch(requestMails());

    messagesSource.get(id).then(message => dispatch(receiveMessage(message)));
  };
}

export function fetchMailsIfNeed(type) {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState(), type)) {
      return dispatch(fetchMails(type));
    }
  };
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
    const selectedMails = getState().messages.items.filter(item => item.selected);

    if (selectedMails.length) {
      return dispatch(markAsImportant(selectedMails));
    }
  };
}

export function markAsImportant(messages) {
  messages = messages.map(message => {
    return {
      ...message,
      type: 'starred'
    };
  });

  return dispatch => {
    messages.forEach(message => {
      message = omit(message, 'selected');
      messagesSource
        .update(message)
        .then(message => dispatch(receiveMail(message)));
    });
  };
}

export function deleteIfNeed() {
  return (dispatch, getState) => {
    const selectedMails = getState().messages.items.filter(item => item.selected);

    if (selectedMails.length) {
      return dispatch(deleteMails(selectedMails));
    }
  }
}

export function deleteMails(messages) {
  return dispatch => {
    messages = messages.map(message => {
      return {
        ...message,
        type: 'deleted',
        important: false
      };
    });

    messages.forEach(message => {
      message = omit(message, 'selected');

      messagesSource
        .update(message)
        .then(message => dispatch(deleteMailFromStore(message.id)));
    });
  }
}
