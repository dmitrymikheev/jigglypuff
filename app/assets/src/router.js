import h from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import App from 'application';

class Router {
  constructor() {
    this.routes = [];
  }

  go(path) {
    window.history.pushState(null, null, path);
    this.onChange(path);
  }

  onChange(path) {
    App.update();
  }

  clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  fragment() {
    return this.clearSlashes(decodeURI(location.pathname));
  }

  addRoutes(routes) {
    routes.map(route => {
      this.routes.push(this.createRoute(route, route.child));
    });
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
    let i = this.routes.length;

    while ( i-- ) {
      const args = path.match(this.routes[i].pattern);

      if (args) {
        return new this.routes[i].component(args.slice(1), this.routes[i].child);
      }
    }
  }
}

export default new Router;
