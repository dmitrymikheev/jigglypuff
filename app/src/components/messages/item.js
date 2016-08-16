import h from 'virtual-dom/h';
import classNames from 'classnames';
import { routes } from 'helpers/routes';
import Component from 'components/base';
import Link from 'components/link';
import { selectMessage, markMessageAsImportant } from 'actions/messages';
import MessagesStore from 'stores/messages';

class Item extends Component {
  handeChange(event) {
    MessagesStore.dispatch(selectMessage(this.props.id));
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
    } = this.props;
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
        new Link({
          className: 'messages-link',
          href: routes.message(id)
        }, title)
      ])
    );
  }
}

export default Item;
