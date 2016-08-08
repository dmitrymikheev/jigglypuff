import h from 'virtual-dom/h';
import classNames from 'classnames';
import Link from 'components/link';
import { selectMessage, markMessageAsImportant } from 'actions/messages';
import MessagesStore from 'stores/messages';

class Item {
  constructor(options) {
    this.options = options;
    return this.render();
  }

  handeChange(event) {
    MessagesStore.dispatch(selectMessage(this.options.id));
  }

  toggleStarred(id) {
    MessagesStore.dispatch(markMessageAsImportant(id));
  }

  render() {
    const {
      title,
      type,
      id,
      selected,
      starred
    } = this.options;
    const className = classNames({
      'mail-item': true,
      'mail-item--starred': starred
    });

    return (
      h('li', { className }, [
        h('input.mail-checkbox', {
          type: 'checkbox',
          checked: selected,
          onchange: this.handeChange.bind(this)
        }),
        h('i.mail-star.fa', {
          onclick: this.toggleStarred.bind(this, id)
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
