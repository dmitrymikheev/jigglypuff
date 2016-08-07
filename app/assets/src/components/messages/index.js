import h from 'virtual-dom/h';
import Thunk from 'vdom-thunk';
import Router from 'router';
import Item from './item';
import App from 'application';
import { fetchMailsIfNeed } from 'actions/messages';
import MessagesStore from 'stores/messages';

class List {
  constructor(params) {
    this.state = MessagesStore.getState().messages;
    MessagesStore.dispatch(fetchMailsIfNeed(params[0]));

    return Thunk(this.render.bind(this), this.state);
  }

  render() {
    return (
      h('ul.mail', this.state.items.map(item => new Item(item)))
    );
  }
}

export default List;
