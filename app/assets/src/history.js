import ComponentFactory from './componentFactory';

class History {
  constructor(options, appNode) {
    this.options = options;
    this.appNode = appNode;

    this.initComponents();
    this.renderComponents();
  }

  initComponents() {
    this.options.map(option => ComponentFactory.addComponent(option.component.url, option.component.name, option.component));
  }

  createHistory(opts, appNode) {
    var pushState = history.pushState;

    history.pushState = function(state) {
      const component = ComponentFactory.getComponent(state);
      const newComponent = new component.component();
      appNode.innerHTML = newComponent.template;

      return pushState.apply(history, arguments);
    }
  }

  renderComponents() {
    const path = location.pathname;
    const approachComponent = this.options.find(opt => opt.url = path);
    const componentName = approachComponent.component.name;
    const component = ComponentFactory.getComponent(componentName);
    const children = approachComponent.children;

    new component(children, this.appNode);
  }

  getComponent(url) {
    const component = ComponentFactory.getComponentUrl(url);
    debugger
  }
}

export default History;
