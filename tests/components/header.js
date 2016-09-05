import chai from 'chai';
import { expect } from 'chai';
import virtualDomChai from 'virtual-dom-chai';
import h from 'virtual-dom/h';
import Link from 'components/link';
import Header from 'components/header';

chai.use(virtualDomChai);

describe('Header', () => {
  it('renders with home link, new message link and dropdown', () => {
    const header = new Header().render();

    expect(header).to.have.a.subtree.with.classes(['logo', 'button', 'dropdown']);
    expect(header).to.have.a.subtree.with.tag('div').with.text('Home');
    expect(header).to.have.a.subtree.with.tag('div').with.text('Write message');
    expect(header).to.have.a.subtree.with.tag('div').with.text('Dropdown');
  });
});
