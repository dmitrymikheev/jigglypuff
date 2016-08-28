import Thunk from 'vdom-thunk';

export default class Component {
  constructor(props, children = []) {
    this.props = props;
    this.children = children;
    this.state = this.getState && this.getState() || {};
    this.beforeRender && this.beforeRender();

    if (!this.render) {
      throw('Component should have render method');
    }

    return Thunk(this.render.bind(this), this.state);
  }
}
