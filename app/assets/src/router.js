import h from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

class Router {
  go(path) {
    window.history.pushState(null, null, path);
    this.onChange();
  }

  onChange() {

  }
}

export default new Router();
