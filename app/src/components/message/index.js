import h from 'virtual-dom/h';
import Thunk from 'vdom-thunk';
import { fetchMessageIfNeed } from 'actions/messages';
import MessagesStore from 'stores/messages';

class Message {
  constructor(params) {
    this.state = MessagesStore.getState().messages.message;
    MessagesStore.dispatch(fetchMessageIfNeed(params[1]));

    return Thunk(this.render.bind(this), this.state);
  }

  getAuthor() {
    return this.state.author || 'Me';
  }

  getUserAvatar() {
    const avatar = this.state.avatar;

    if (avatar) {
      return h('.message-author', {
        style: { backgroundImage: `url(${avatar})` }
      });
    } else {
      return h('.message-author');
    }
  }

  render() {
    const author = this.getAuthor();
    const avatar = this.getUserAvatar();

    return (
      h('.message', [
        h('.message-field', [
          avatar,
          h('.message-label', 'Author:'),
          author
        ]),
        h('.message-field', [
          h('.message-label', 'Title:'),
          this.state.title
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
