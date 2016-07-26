import h from 'virtual-dom/h';
import Link from 'components/link';

class Header {
  constructor() {
    return this.render();
  }

  render() {
    return h('.header', [
      new Link('Home', { href: '/' })
    ]);
  }
}

export default Header;
