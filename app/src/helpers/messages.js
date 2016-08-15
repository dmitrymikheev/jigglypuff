import { omit, reject } from 'lodash';

export function getSelectedMessages(messages) {
  return messages.filter(item => item.selected);
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

export function updateMessage(messages, message) {
  return messages.map(item => item.id === message.id ? message : item);
}

export function deleteMessage(messages, id) {
  return reject(messages, (message) => message.type !== 'deleted' && message.id === id);
}

export function toggleMessageField(messages, field, id) {
  return messages.map((message) => {
    if (message.id === id) {
      return {
        ...message,
        [field]: !message[field]
      };
    }

    return message;
  });
}
