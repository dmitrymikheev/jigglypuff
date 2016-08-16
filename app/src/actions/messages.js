import qwest from 'qwest';
import messagesSource from 'sources/messages';
import {
  changeTypeMessages,
  toggleStarredMessages,
  getSelectedMessages,
  prepareParams
} from 'helpers/messages';
import {
  shouldFetchMessages,
  shouldFetchMessage
} from 'helpers/fetch';

export const MAKE_REQUEST = 'MAKE_REQUEST';
export function makeRequest() {
  return { type: MAKE_REQUEST };
}

export const FAILURE_REQUEST = 'FAILURE_REQUEST';
export function failureRequest(message) {
  return {
    message,
    type: FAILURE_REQUEST,
    status: 'error'
  };
}

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export function receiveMessages(items) {
  return {
    items,
    type: RECEIVE_MESSAGES,
    message: 'Receive Messages',
    status: 'success'
  };
}

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export function receiveMessage(message) {
  return {
    message,
    type: RECEIVE_MESSAGE
  };
}

export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export function updateMessage(message) {
  return {
    message,
    type: UPDATE_MESSAGE
  };
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

export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export function hideNotification() {
  return {
    type: HIDE_NOTIFICATION
  };
}

export function fetchMessages(type) {
  return dispatch => {
    dispatch(makeRequest());
    const params = prepareParams(type);

    messagesSource
      .fetch({ ...params })
      .then(messages => dispatch(receiveMessages(messages)))
      .catch((e, xhr, response) => dispatch(failureRequest(e.message)));
  };
}

export function fetchMessage(id) {
  return dispatch => {
    dispatch(makeRequest());

    messagesSource
      .get(id)
      .then(message => dispatch(receiveMessage(message)));
  };
}

export function fetchMessagesIfNeed(type = 'inbox') {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState(), type)) {
      return dispatch(fetchMessages(type));
    }
  };
}

export function fetchMessageIfNeed(id) {
  return (dispatch, getState) => {
    if (shouldFetchMessage(getState(), id)) {
      return dispatch(fetchMessage(id));
    }
  };
}

export function markAsStarred() {
  return (dispatch, getState) => {
    const messages = getSelectedMessages(getState().messages.items);

    if (messages.length) {
      return dispatch(setStarredMessages(messages, true));
    }
  };
}

export function unmarkAsStarred() {
  return (dispatch, getState) => {
    const messages = getSelectedMessages(getState().messages.items);

    if (messages.length) {
      return dispatch(setStarredMessages(messages, false));
    }
  };
}

export function markMessageAsImportant(id) {
  return (dispatch, getState) => {
    const message = getState().messages.items.filter(item => item.id === id);

    return dispatch(setStarredMessages(message));
  };
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
    const selectedMessages = getSelectedMessages(getState().messages.items);

    if (selectedMessages.length) {
      return dispatch(deleteMessages(selectedMessages));
    }
  };
}

export function deleteMessages(messages) {
  return dispatch => {
    messages = changeTypeMessages(messages, 'deleted');

    messages.forEach(message => {
      messagesSource
        .update(message)
        .then(message => dispatch(deleteMessageFromStore(message.id)));
    });
  };
}
