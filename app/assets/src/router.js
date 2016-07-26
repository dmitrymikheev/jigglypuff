import h from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import App from 'application';

class Router {
  constructor() {
    this.root = '/';
    this.routes = [];
  }

  go(path) {
    window.history.pushState(null, null, path);
    this.onChange(path);
  }

  onChange(path) {
    App.update();
    // this.fragment();
    // this.check();
  }

  clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  fragment() {
    let fragment = '';
    fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
    fragment = fragment.replace(/\?(.*)$/, '');
    fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;

    return this.clearSlashes(fragment);
  }

  add(routes) {
    routes.map(route => {
      this.routes.push({
        url: route.url,
        component: route.component
      });
    });
    console.log(this.routes)
  }

  check() {
    const fragment = this.fragment();

    for(let i = 0; i < this.routes.length; i++) {
      const match = fragment.match(this.routes[i].url);

      if (match) {
        match.shift();
        App.changeComponent(this.routes, match);
      }
    }
  }
}

export default new Router;
