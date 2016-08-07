import h from 'virtual-dom/h';
import classNames from 'classnames';
import Link from 'components/link';
import { selectMail } from 'actions/messages';
import MessagesStore from 'stores/messages';

class Item {
  constructor(options) {
    this.options = options;
    return this.render();
  }

  handeChange(event) {
    MessagesStore.dispatch(selectMail(this.options.id));
  }

  render() {
    const {
      title,
      type,
      id,
      selected
    } = this.options;
    const className = classNames({
      'mail-item': true,
      'mail-item--starred': type === 'starred'
    });

    return (
      h('li', { className }, [
        h('input.mail-checkbox', {
          type: 'checkbox',
          checked: selected,
          onchange: this.handeChange.bind(this)
        }),
        new Link(title, {
          className: 'mail-link',
          href: `/mail/${type}/message/${id}`
        })
      ])
    );
  }
}

export default Item;
