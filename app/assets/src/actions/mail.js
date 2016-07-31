import qwest from 'qwest';

export const REQUEST_MAIL = 'REQUEST_MAIL';
export function requestMails() {
  return { type: REQUEST_MAIL }
}

export const RECEIVE_MAILS = 'RECEIVE_MAILS';
export function receiveMails(mails) {
  return {
    type: RECEIVE_MAILS,
    items: mails
  }
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
    } else {
      return Promise.resolve();
    }
  };
}
