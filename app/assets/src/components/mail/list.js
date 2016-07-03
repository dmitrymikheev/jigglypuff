import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';
import MailService from '../../services/mail';
import Router from '../../router';
import Item from './item';

class List {
  constructor() {
    this.items = []
    this.getItems();
    return this.render();
  }

  getItems() {
    return MailService.getMails().then((data) => {
      this.items = data.map(item => new Item(item));
      this.rerender();
    });
  }

  rerender() {
    const newView = this.update();
    const patches = diff(this.view, newView);

    Router.updateView(patches);
    this.view = newView;
  }

  update() {
    return h('.list', this.items.map(item => new Item(item)));
  }

  render() {
    this.view = h('.list', this.items.map(item => new Item(item)));

    return this.view;
  }
}

export default List;
