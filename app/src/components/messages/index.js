import h from 'virtual-dom/h';
import Component from 'components/base';
import Router from 'router';
import Item from './item';
import App from 'application';
import { fetchMessagesIfNeed } from 'actions/messages';
import MessagesStore from 'stores/messages';

class List extends Component {
  beforeRender() {
    const type = this.props || 'inbox';

    MessagesStore.dispatch(fetchMessagesIfNeed(type));
  }

  getState() {
    return MessagesStore.getState();
  }

  render() {
    const { items } = this.state;

    if (!items.length) return h('ul.messages.messages--empty', 'Empty List');

    return (
      h('ul.messages', items.map(item => new Item(item)))
    );
  }
}

export default List;
