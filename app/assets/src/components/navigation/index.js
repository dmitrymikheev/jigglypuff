import h from 'virtual-dom/h';
import createElement from 'virtual-dom/create-element';
import Link from 'components/link';

const NAV_ITEMS = [
  {
    icon: 'inbox',
    text: 'Inbox',
    href: 'mail/inbox'
  },
  {
    icon: 'files-o',
    text: 'Draft',
    href: 'mail/drafts'
  },
  {
    icon: 'star-o',
    text: 'Starred',
    href: 'mail/starred'
  },
  {
    icon: 'trash-o',
    text: 'Deleted',
    href: 'mail/deleted'
  }
];

export default class Navigation {
  constructor(props) {
    return this.render();
  }

  renderNavItem(item) {
    const itemClass = `i.nav-icon.fa.fa-${item.icon}`;

    return (
      h('li.nav-item',
        new Link(
          [ h(itemClass), item.text ],
            { className: 'nav-link', href: item.href }
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
