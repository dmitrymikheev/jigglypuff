import h from 'virtual-dom/h';
import createElement from 'virtual-dom/create-element';
import Link from '../link';

const navigationItems = [
  {
    icon: 'inbox',
    text: 'Inbox',
    href: '/inbox'
  },
  {
    icon: 'files-o',
    text: 'Draft',
    href: '/draft'
  },
  {
    icon: 'star-o',
    text: 'Starred',
    href: '/starred'
  },
  {
    icon: 'trash-o',
    text: 'Deleted',
    href: '/deleted'
  }
];

export default class Navigation {
  constructor(props) {
    return this.render();
  }

  render() {
    return h('nav.nav', {
      styles: {
        border: '1px solid black'
      }
    }, [
      h('ul.nav-list', [
        navigationItems.map((item) => {
          return h('li.nav-item', [
            new Link([h(`i.nav-icon.fa.fa-${item.icon}`), item.text],
              {
                className: 'nav-link',
                href: item.href
              }
            )
          ]);
        })
      ])
    ]);
  }
}
