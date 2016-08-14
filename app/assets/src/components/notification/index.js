import h from 'virtual-dom/h';
import Thunk from 'vdom-thunk';
import { hideNotification } from 'actions/messages';
import MessagesStore from 'stores/messages';

class Notification {
  constructor() {
    this.state = MessagesStore.getState().notification;
    this.hideNotification();

    return Thunk(this.render.bind(this), this.state);
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
