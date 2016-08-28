import h from 'virtual-dom/h';
import Component from 'components/base';
import { hideNotification } from 'actions/messages';
import MessagesStore from 'stores/messages';
import MessageStore from 'stores/message';

class Notification extends Component {
  beforeRender() {
    this.hideNotification();
  }

  getState() {
    return {
      ...MessagesStore.getState().notification,
      ...MessageStore.getState().notification
    };
  }

  hideNotification() {
    const { isHidden, message } = this.state;

    if (!isHidden && message) {
      setTimeout(() => {
        MessagesStore.dispatch(hideNotification());
      }, 3000);
    }
  }

  render() {
    if (!this.state.isHidden) {
      return (
        h(`.notification .notification--${this.state.status}`, this.state.message)
      );
    }

    return h();
  }
}

export default Notification;
