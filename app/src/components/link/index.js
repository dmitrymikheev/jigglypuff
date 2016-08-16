import h from 'virtual-dom/h';
import Component from 'components/base';
import Router from 'router';

class Link extends Component {
  render() {
    const { className, href } = this.props;

    return (
      h('a', {
        className,
        href,
        onclick: this.onClick
      }, this.children)
    );
  }

  onClick(event) {
    const path = event.currentTarget.href;

    event.preventDefault();
    Router.go(path);
  }
}

export default Link;
