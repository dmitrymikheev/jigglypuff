import h from 'virtual-dom/h';
import Link from 'components/link';

class Header {
  constructor() {
    return this.render();
  }

  render() {
    return h('.header', [
      new Link('Home', { href: '/', className: 'logo' }),
      new Link('Write message', { href: '/mail/new', className: 'button button--message' })
    ]);
  }
}

export default Header;
