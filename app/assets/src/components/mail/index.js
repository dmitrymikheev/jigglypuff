import h from 'virtual-dom/h';
import Thunk from 'vdom-thunk';
import MailService from 'services/mail';
import Router from 'router';
import Item from './item';
import { showMails, fetchMailsIfNeed } from 'actions/mail';
import mailStore from 'stores/mail';

class List {
  constructor() {
    this.type = "Thunk";
    this.items = mailStore.getState().mail.items;
    let unsubscribe = mailStore.subscribe(() => {
      this.items = mailStore.getState().mail.items;
    });
    mailStore.dispatch(fetchMailsIfNeed()).then(() => {

    });
    return Thunk(this.render, this.items);
  }

  getItems() {
    return MailService.getMails().then((data) => {
      this.items = data;
    });
  }

  render(items) {
    return h('.list', items.map(item => new Item(item)));
  }
}

export default List;
