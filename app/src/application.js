import h from 'virtual-dom/h';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';
import createElement from 'virtual-dom/create-element';
import Thunk from 'vdom-thunk';
import Navigation from 'components/navigation';
import Header from 'components/header';
import Messages from 'components/messages';
import Notification from 'components/notification';
import MessagesStore from 'stores/messages';
import MessageStore from 'stores/message';
import Router from 'router';

class App {
  init(components) {
    Router.addRoutes(components);
    this.components = components;
    this.tree = this.render();
    this.rootNode = createElement(this.tree);

    document.getElementById('root').appendChild(this.rootNode);
    this.subscribeToStores([MessagesStore], [MessageStore]);
  }

  subscribeToStores(stores) {
    stores.forEach(store => store.subscribe(() => this.update()));
  }

  render() {
    this.defineChildren(this.components);

    return (
      h('.app', [
        new Header,
        new Navigation,
        new Notification,
        h('.container', this.children)
      ])
    );
  }

  defineChildren(components) {
    const fragment = Router.fragment();
    const component = Router.getCurrentComponent(fragment);

    this.children = component ? component : new Messages;
  }

  update() {
    const newTree = this.render();
    const patches = diff(this.tree, newTree);
    this.rootNode = patch(this.rootNode, patches);
    this.tree = newTree;
  }
}

export default new App;
