import h from 'virtual-dom/h';
import Link from 'components/link';
import Component from 'components';
import Dropdown from 'components/dropdown';
import { markAsImportantIfNeed, deleteIfNeed } from 'actions/messages';
import MessagesStore from 'stores/messages';

const actions = {
  mark: markAsImportantIfNeed,
  unmark: '',
  delete: deleteIfNeed
};

class Header extends Component {
  hangeSelect(value) {
    MessagesStore.dispatch(actions[value]());
  }

  render() {
    return (
      h('.header', [
        new Link('Home', { href: '/', className: 'logo' }),
        new Link('Write message', { href: '/mail/new', className: 'button button--message' }),
        new Dropdown({
          onSelect: this.hangeSelect
        })
      ])
    )
  }
}

export default Header;
