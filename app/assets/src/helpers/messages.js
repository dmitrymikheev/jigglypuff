import { omit } from 'lodash';

export function getSelectedMessages(messages) {
  return messages.filter(item => item.selected);
}

export function shouldFetchMessages(state, type) {
  const items = state.messages.items;

  if (!items.length && !state.messages.isFetching) {
    return true;
  } else if (items.length && !state.messages.isFetching) {
    return items.some(item => item.type !== type)
  }

  return false;
}

export function shouldFetchMessage(state, id) {
  const message = state.messages.message;

  if (!message.id && !state.messages.isFetching) {
    return true;
  } else if (message.id && !state.messages.isFetching) {
    return message.id !== parseInt(id);
  }

  return false;
}

export function changeTypeMessages(messages, type) {
  return messages.map(message => {
    message = omit(message, 'selected');

    return {
      ...message,
      type
    };
  });
}

export function toggleStarredMessages(messages, starred) {
  return messages.map(message => {
    message = omit(message, 'selected');

    return {
      ...message,
      starred: starred ? starred : !message.starred
    };
  });
}

export function prepareParams(type) {
  return type === 'starred' ? { starred: true } : { type };
}
