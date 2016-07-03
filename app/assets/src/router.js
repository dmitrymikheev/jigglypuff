import h from 'virtual-dom/h';
import createElement from 'virtual-dom/create-element';

class Router {
  constructor(options, root) {
    // this.initRoot (options, root);
    // this.onChange();
  }

  initRoot(options, root) {
    const path = window.location.pathname;
    const app = createElement(new options.root);

    this.app = app;
    root.appendChild(app);
  }

  go(path) {
    window.history.pushState(null, null, path);
    this.onChange();
  }

  updateView(patches) {
    this.app = patch(app, patches);
  }

  onChange() {

  }
}

export default new Router();
