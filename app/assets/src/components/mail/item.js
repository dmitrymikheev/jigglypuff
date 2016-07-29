import h from 'virtual-dom/h';
import Link from 'components/link';

class Item {
  constructor(options) {
    this.options = options;
    return this.render();
  }

  render() {
     const {
      title,
      type,
      id
    } = this.options;

    return (
      h('li.mail-item', [
        new Link(title, {
          className: 'mail-link',
          href: `/mail/${type}/message/${id}`
        })
      ])
    );
  }
}

export default Item;
