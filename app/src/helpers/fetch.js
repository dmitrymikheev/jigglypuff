export function shouldFetchMessages(state, type) {
  const {
    items,
    isFetching,
    messageType,
    receiveEmpty
  } = state.messages;

  if (!items.length && !isFetching && !receiveEmpty) {
    return true;
  } else if (messageType !== type && !isFetching) {
    return true;
  } else if (type === 'starred' && !isFetching) {
    return items.some(item => !item.starred);
  } else if (items.length && !isFetching) {
    return items.some(item => item.type !== type);
  }

  return false;
}

export function shouldFetchMessage(state, id) {
  const { message, isFetching } = state.messages;

  if (!message.id && !isFetching) {
    return true;
  } else if (message.id && !isFetching) {
    return message.id !== parseInt(id);
  }

  return false;
}
