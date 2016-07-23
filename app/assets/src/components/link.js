import h from 'virtual-dom/h';
import Router from '../router';

export default class Link {
  constructor(children, props) {
    this.children = children;
    this.props = props;
    return this.render();
  }

  render() {
    const props = this.props;

    return h('a', {
      className: props.className,
      href: props.href,
      onclick: this.onClick,
    }, this.children);
  }

  onClick(event) {
    event.preventDefault();
    const path = event.currentTarget.href;

    Router.go(path);
  }
}
