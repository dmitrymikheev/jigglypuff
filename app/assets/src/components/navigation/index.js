import h from 'virtual-dom/h';
import createElement from 'virtual-dom/create-element';
import Link from 'components/link';

const navigationItems = [
  {
    icon: 'inbox',
    text: 'Inbox',
    href: 'mail'
  },
  {
    icon: 'files-o',
    text: 'Draft',
    href: 'mail'
  },
  {
    icon: 'star-o',
    text: 'Starred',
    href: 'mail'
  },
  {
    icon: 'trash-o',
    text: 'Deleted',
    href: 'mail'
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
