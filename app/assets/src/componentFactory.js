class ComponentFactory {
  constructor() {
    this.components = [];
  }

  addComponent(url, name, component) {
    this.components.push({
      url,
      name,
      component
    });
  }

  getComponent(name) {
    return this.components.find(component => component.name === name).component;
  }

  getComponentUrl(url) {
    return this.components.find(component => component.url === url).component;
  }
}

export default new ComponentFactory();
