import h from 'virtual-dom/h';
import { routes } from 'helpers/routes';
import Link from 'components/link';
import Component from 'components/base';
import Dropdown from 'components/dropdown';
import { markAsStarred, unmarkAsStarred, deleteIfNeed } from 'actions/messages';
import MessagesStore from 'stores/messages';

const actions = {
  mark: markAsStarred,
  unmark: unmarkAsStarred,
  delete: deleteIfNeed
};

class Header extends Component {
  hangeSelect(value) {
    MessagesStore.dispatch(actions[value]());
  }

  render() {
    return (
      h('.header', [
        new Link({ href: routes.root(), className: 'logo' }, 'Home'),
        new Link({ href: routes.newMessage(), className: 'button button--message' }, 'Write message'),
        new Dropdown({
          onSelect: this.hangeSelect
        })
      ])
    );
  }
}

export default Header;
