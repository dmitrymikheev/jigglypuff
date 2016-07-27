import h from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import App from 'application';

class Router {
  constructor() {
    this.root = '/';
    this.routes = [];
  }

  go(path) {
    window.history.pushState('pek', 'kek', path);
    this.onChange(path);
  }

  onChange(path) {
    App.update();
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

  parseRoutes(routes) {
    this.routes = routes.map(route => {
      const fragment = this.fragment();
      const fullRoute = route.url;
      const url = this.parseUrl(route.url);
      const param = this.getParam(route.url);
      const component = route.component;

      return {
        url,
        param,
        component,
        fullRoute
      }
    });
  }

  getCurrentComponent() {
    const fragment = this.fragment();
    const currentRoute = this.routes.find(route => {
      if (route.url.length && fragment.indexOf(route.url) !== -1) return route.component;
    });

    if (currentRoute) {
      const params = fragment.replace(`${currentRoute.url}/`, '');
      return new currentRoute.component(params);
    }
  }

  parseUrl(route) {
    const discardParams = /\/\:([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

    return route.replace(discardParams, '')
  }

  getParam(route) {
    const regex = /:([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
    const matches = regex.exec(route);

    return matches && matches[1];
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
