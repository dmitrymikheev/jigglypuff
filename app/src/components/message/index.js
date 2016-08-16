import h from 'virtual-dom/h';
import ThunkComponent from 'components/base/thunk';
import { fetchMessageIfNeed } from 'actions/messages';
import MessagesStore from 'stores/messages';

class Message extends ThunkComponent {
  beforeRender() {
    MessagesStore.dispatch(fetchMessageIfNeed(this.props[0]));
  }

  getState() {
    return MessagesStore.getState().messages.message;
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
