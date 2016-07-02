import h from 'virtual-dom/h';
import ComponentFactory from '../componentFactory';
import History from '../history';

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
      onclick: (event) => {
        const url = event.target.getAttribute('href');
        console.log(url);
        history.pushState({}, '', url)
        History.getComponent(url);
        // debugger
        event.preventDefault();
      }
    }, this.children);
  }
}
