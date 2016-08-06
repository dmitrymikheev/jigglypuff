import h from 'virtual-dom/h';
import Link from 'components/link';
import Component from 'components';
import Dropdown from 'components/dropdown';
import { markImportant, markAsImportantIfNeed, deleteIfNeed } from 'actions/mail';
import mailStore from 'stores/mail';

class Header extends Component {
  hangeSelect(value) {
    if (value === 'important') {
      mailStore.dispatch(markAsImportantIfNeed())
    } else if(value === 'delete') {
      mailStore.dispatch(deleteIfNeed());
    }
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
