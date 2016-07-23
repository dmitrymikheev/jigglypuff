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

export function fetchMails() {
  return dispatch => {
    dispatch(requestMails());

    return qwest.get('http://localhost:3000/emails')
     .then(function(xhr, response) {
        return dispatch(receiveMails(response));
     });
  };
}

export function shouldFetchMails(state) {
  return !state.mail.items.length;
}

export function fetchMailsIfNeed() {
  return (dispatch, getState) => {
    if (shouldFetchMails(getState())) {
      return dispatch(fetchMails());
    } else {
      return Promise.resolve();
    }
  };
}
