import h from 'virtual-dom/h';
import Component from 'components/base';
import { fetchMessageIfNeed } from 'actions/messages';
import MessagesStore from 'stores/messages';

class Message extends Component {
  beforeRender() {
    MessagesStore.dispatch(fetchMessageIfNeed(this.props));
  }

  getState() {
    return MessagesStore.getState().message;
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
