export default class Component {
  constructor(props, children = []) {
    this.props = props;
    this.children = children;

    return this.render();
  }
}
