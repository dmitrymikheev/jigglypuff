import chai from 'chai';
import { expect } from 'chai';
import chaiVirtualDom from 'chai-virtual-dom';
import h from 'virtual-dom/h';
import Link from 'components/link';

chai.use(chaiVirtualDom);

describe('Link', () => {
  it('looks like hyperlink', () => {
    const link = new Link({ href: '/', className: 'link' }, 'My Link');
    const expectedLink = h('a', {
      className: 'link',
      href: '/'
    }, 'My Link');

    expect(link).to.look.exactly.like(expectedLink);
  });
});
