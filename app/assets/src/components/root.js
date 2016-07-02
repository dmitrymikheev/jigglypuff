import h from 'virtual-dom/h';
import createElement from 'virtual-dom/create-element';
import Navigation from './navigation/navigation';

export default class Root {
  constructor(children = [], appNode) {
    this.children = children;
    return this.render(appNode);
  }

  render(appNode) {
    this.children = this.children.map(child => new child.component());
    const app = h('.container', [
      new Navigation(),
      this.children
    ]);

    const rootNode = createElement(app);
    appNode.appendChild(rootNode);
  }
}
