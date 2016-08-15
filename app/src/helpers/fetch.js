export function shouldFetchMessages(state, type) {
  const items = state.messages.items;

  if (!items.length && !state.messages.isFetching) {
    return true;
  } else if (type === 'starred' && !state.messages.isFetching) {
    return items.some(item => !item.starred);
  } else if (items.length && !state.messages.isFetching) {
    return items.some(item => item.type !== type);
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
