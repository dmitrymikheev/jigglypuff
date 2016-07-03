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
    let target = event.target;
    let path = event.target.href;

    while(!path && target) {
      target = event.target.parentElement;
      path = target.href;
    }

    Router.go(path);
  }
}
