import h from 'virtual-dom/h';
import ThunkComponent from 'components/base/thunk';
import { hideNotification } from 'actions/messages';
import MessagesStore from 'stores/messages';
import MessageStore from 'stores/message';

class Notification extends ThunkComponent {
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
    if (!this.state.isHidden) {
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
