import h from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import { clone } from 'lodash';
import App from 'application';

class Router {
  constructor() {
    this.routes = [];
    this.bindEvents();
  }

  init(routes) {
    routes.forEach(route => {
      this.routes.push(this.createRoute(route, route.child));
    });
  }

  bindEvents() {
    window.addEventListener('popstate', (event) => {
      this.go(location.pathname);
    }, false);
  }

  go(path) {
    window.history.pushState(null, null, path);
    this.onChange();
  }

  onChange() {
    App.update();
  }

  clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  fragment() {
    return this.clearSlashes(decodeURI(location.pathname));
  }

  createRoute(route, child = null) {
    route = {
      pattern: new RegExp(`^${ route.url.replace(/:\w+/g, '(\\w+)') }$`),
      component: route.component
    };

    return {
      ...route,
      child
    };
  }

  getCurrentComponent(path) {
    const routes = clone(this.routes);
    const correctRoute = routes.reverse().find(route => path.match(route.pattern));

    if (correctRoute) {
      const args = path.match(correctRoute.pattern).slice(1).join();

      return new correctRoute.component(args, correctRoute.child);
    }

    return window.location.href = '/';
  }
}

export default new Router;
