import h from 'virtual-dom/h';
import Thunk from 'vdom-thunk';
import Router from 'router';
import Item from './item';
import App from 'application';
import { showMails, fetchMailsIfNeed } from 'actions/mail';
import mailStore from 'stores/mail';

class List {
  constructor() {
    this.type = "Thunk";
    this.items = mailStore.getState().mail.items;
    console.log(this.items);
    // let unsubscribe = mailStore.subscribe(() => {
    //   this.items = mailStore.getState().mail.items;
    // });
    mailStore.dispatch(fetchMailsIfNeed()).then(() => {
      // App.update();
    });
    return Thunk(this.render, this.items);
  }

  render(items) {
    return h('.list', items.map(item => new Item(item)));
  }
}

export default List;
