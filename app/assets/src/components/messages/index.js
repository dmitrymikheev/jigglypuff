import h from 'virtual-dom/h';
import Thunk from 'vdom-thunk';
import Router from 'router';
import Item from './item';
import App from 'application';
import { fetchMailsIfNeed } from 'actions/messages';
import MessageStore from 'stores/messages';

class List {
  constructor(params) {
    this.state = MessageStore.getState().mail;
    this.items = this.state.items;
    MessageStore.dispatch(fetchMailsIfNeed(params[0]));

    return Thunk(this.render, this.items);
  }

  render(items) {
    return (
      h('ul.mail', items.map(item => new Item(item)))
    );
  }
}

export default List;
