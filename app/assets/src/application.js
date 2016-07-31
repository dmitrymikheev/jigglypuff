import h from 'virtual-dom/h';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';
import createElement from 'virtual-dom/create-element';
import Thunk from 'vdom-thunk';
import Navigation from 'components/navigation';
import MailList from 'components/mail';
import HomePage from 'components/home';
import Header from 'components/header';
import mailStore from 'stores/mail';
import messageStore from 'stores/message';
import Router from 'router';

class App {
  init(components) {
    Router.addRoutes(components);
    this.components = components;
    this.tree = this.render();
    this.rootNode = createElement(this.tree);

    document.body.appendChild(this.rootNode);

    mailStore.subscribe(() => {
      this.update();
    });

    messageStore.subscribe(() => {
      this.update();
    });
  }

  render() {
    this.defineChildren(this.components);

    return (
      h('.app', [
        new Header,
        h('.wrapper', [
          new Navigation,
          this.children
        ])
      ])
    );
  }

  defineChildren(components) {
    const fragment = Router.fragment();
    const component = Router.getCurrentComponent(fragment);

    this.children = component ? component : new HomePage;
  }

  update() {
    const newTree = this.render();
    const patches = diff(this.tree, newTree);
    this.rootNode = patch(this.rootNode, patches);
    this.tree = newTree;
  }
}

export default new App;
