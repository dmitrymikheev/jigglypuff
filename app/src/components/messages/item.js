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
      'messages-item': true,
      'messages-item--starred': starred
    });

    return (
      h('li', { className }, [
        h('input.messages-checkbox', {
          type: 'checkbox',
          checked: selected,
          onchange: this.handeChange.bind(this)
        }),
        h('i.messages-star.fa', {
          onclick: this.toggleStarred.bind(this, id)
        }),
        new Link(title, {
          className: 'messages-link',
          href: `/messages/${type}/message/${id}`
        })
      ])
    );
  }
}

export default Item;
