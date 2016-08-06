import h from 'virtual-dom/h';
import classNames from 'classnames';
import Link from 'components/link';
import { selectMail } from 'actions/mail';
import mailStore from 'stores/mail';

class Item {
  constructor(options) {
    this.options = options;
    return this.render();
  }

  handeChange(event) {
    mailStore.dispatch(selectMail(this.options.id));
  }

  render() {
     const {
      title,
      type,
      id,
      selected,
      important
    } = this.options;
    const className = classNames({
      'mail-item': true,
      'mail-item--important': important
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
