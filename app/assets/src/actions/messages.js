import qwest from 'qwest';
import messagesSource from 'sources/messages';
import {
  shouldFetchMessages,
  shouldFetchMessage,
  changeTypeMessages,
  toggleStarredMessages,
  getSelectedMessages,
  prepareParams
} from 'helpers/messages';

export const MAKE_REQUEST = 'MAKE_REQUEST';
export function requestMails() {
  return { type: MAKE_REQUEST };
}

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export function receiveMails(items) {
  return {
    items,
    type: RECEIVE_MESSAGES
  };
}

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export function receiveMessage(message) {
  return {
    message,
    type: RECEIVE_MESSAGE
  }
}

export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export function updateMessage(message) {
  return {
    message,
    type: UPDATE_MESSAGE
  }
}

export const SELECT_MESSAGE = 'SELECT_MESSAGE';
export function selectMessage(id) {
  return {
    id,
    type: SELECT_MESSAGE
  };
}

export const MARK_IMPORTANT = 'MARK_IMPORTANT';
export function markImportant() {
  return {
    type: MARK_IMPORTANT
  };
}

export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export function deleteMessageFromStore(id) {
  return {
    id,
    type: DELETE_MESSAGE
  };
}

export function fetchMails(type) {
  return dispatch => {
    dispatch(requestMails());
    const params = prepareParams(type);

    messagesSource.fetch({ ...params }).then(messages => dispatch(receiveMails(messages)));
  };
}

export function fetchMessage(id) {
  return dispatch => {
    dispatch(requestMails());

    messagesSource.get(id).then(message => dispatch(receiveMessage(message)));
  };
}

export function fetchMessagesIfNeed(type) {
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

export function markAsStarred() {
  return (dispatch, getState) => {
    const messages = getSelectedMessages(getState().messages.items)

    if (messages.length) {
      return dispatch(setStarredMessages(messages, true));
    }
  };
}

export function unmarkAsStarred() {
  return (dispatch, getState) => {
    const messages = getSelectedMessages(getState().messages.items)

    if (messages.length) {
      return dispatch(setStarredMessages(messages, false));
    }
  };
}

export function markMessageAsImportant(id) {
  return (dispatch, getState) => {
    const message = getState().messages.items.filter(item => item.id === id);

    return dispatch(setStarredMessages(message));
  }
}

export function setStarredMessages(messages, starred) {
  return dispatch => {
    messages = toggleStarredMessages(messages, starred);

    messages.forEach(message => {
      messagesSource
        .update(message)
        .then(message => dispatch(updateMessage(message)));
    });
  };
}

export function deleteIfNeed() {
  return (dispatch, getState) => {
    const selectedMails = getState().messages.items.filter(item => item.selected);

    if (selectedMails.length) {
      return dispatch(deleteMessages(selectedMails));
    }
  }
}

export function deleteMessages(messages) {
  return dispatch => {
    messages = changeTypeMessages(messages, 'deleted');

    messages.forEach(message => {
      messagesSource
        .update(message)
        .then(message => dispatch(deleteMessageFromStore(message.id)));
    });
  }
}
