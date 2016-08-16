import h from 'virtual-dom/h';
import ThunkComponent from 'components/base/thunk';
import Router from 'router';
import Item from './item';
import App from 'application';
import { fetchMessagesIfNeed } from 'actions/messages';
import MessagesStore from 'stores/messages';

class List extends ThunkComponent {
  beforeRender() {
    MessagesStore.dispatch(fetchMessagesIfNeed(this.props[0]));
  }

  getState() {
    return MessagesStore.getState().messages;
  }

  render() {
    return (
      h('ul.messages', this.state.items.map(item => new Item(item)))
    );
  }
}

export default List;
