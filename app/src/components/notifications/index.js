import h from 'virtual-dom/h';
import Component from 'components/base';
import { hideNotification } from 'actions/messages';
import NotificationsStore from 'stores/notifications';

class Notifications extends Component {

  getState() {
    return NotificationsStore.getState();
  }

  render() {
    const { hidden, text, status } = this.state;

    if (!hidden) {
      return (
        h(`.notification .notification--${status}`, text)
      );
    }

    return h();
  }
}

export default Notifications;
