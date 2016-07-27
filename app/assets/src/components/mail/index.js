import h from 'virtual-dom/h';
import Thunk from 'vdom-thunk';
import Router from 'router';
import Item from './item';
import App from 'application';
import { fetchMailsIfNeed } from 'actions/mail';
import mailStore from 'stores/mail';

class List {
  constructor(params) {
    this.type = "Thunk";
    this.state = mailStore.getState().mail;
    this.items = this.state.items;
    mailStore.dispatch(fetchMailsIfNeed(params));

    return Thunk(this.render, this.items);
  }

  render(items) {
    return h('.list', items.map(item => new Item(item)));
  }
}

export default List;
