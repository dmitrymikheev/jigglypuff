import h from 'virtual-dom/h';
import Thunk from 'vdom-thunk';
import { fetchMessageIfNeed } from 'actions/messages';
import MessageStore from 'stores/messages';

class Message {
  constructor(params) {
    this.state = MessageStore.getState().mail.message;
    MessageStore.dispatch(fetchMessageIfNeed(params[1]));

    return Thunk(this.render.bind(this), this.state);
  }

  render() {
    return (
      h('.message', [
        h('.message-field', [
          h('.message-label', 'Title:'),
          this.state.title
        ]),
        h('.message-field', [
          h('.message-label', 'Author'),
          this.state.author
        ]),
        h('.message-field', [
          h('.message-label', 'Message:'),
          this.state.body
        ])
      ])
    );
  }
}
export default Message;
