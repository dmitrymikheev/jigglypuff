import { showNotificationWithTemout } from 'actions/notifications';
import NotificationsStore from 'stores/notifications';

export default class Notifications {
  static success(text) {
    NotificationsStore.dispatch(
      showNotificationWithTemout('success', text)
    );
  }

  static error(text) {
    NotificationsStore.dispatch(
      showNotificationWithTemout('error', text)
    );
  }
}
