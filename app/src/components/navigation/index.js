import h from 'virtual-dom/h';
import Component from 'components/base';
import { NAV_ITEMS } from 'helpers/routes';
import Link from 'components/link';

class Navigation extends Component {
  renderNavItem(item) {
    const itemClass = `i.nav-icon.fa.fa-${item.icon}`;

    return (
      h('li.nav-item',
        new Link(
          { className: 'nav-link', href: item.href },
          [h(itemClass), item.text]
        )
      )
    );
  }

  render() {
    return (
      h('nav.nav', [
        h('ul.nav-list', [
          NAV_ITEMS.map(this.renderNavItem)
        ])
      ])
    );
  }
}

export default Navigation;
