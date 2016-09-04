const HIDE_NOTIFICATION_DELAY = 5000;

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export function showNotification(status, text) {
  return {
    text,
    status,
    type: SHOW_NOTIFICATION
  };
}

export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export function hideNotification() {
  return {
    type: HIDE_NOTIFICATION
  };
}

export function showNotificationWithTemout(status, text) {
  return (dispatch, getState) => {
    dispatch(showNotification(status, text));

    setTimeout(() => {
      dispatch(hideNotification());
    }, HIDE_NOTIFICATION_DELAY);
  };
}
