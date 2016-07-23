import h from 'virtual-dom/h';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';
import createElement from 'virtual-dom/create-element';
import Thunk from 'vdom-thunk';
import Navigation from 'components/navigation';
import MailList from 'components/mail';
import mailStore from 'stores/mail';

class App {
  init() {
    this.tree = this.render();
    this.rootNode = createElement(this.tree);

    document.body.appendChild(this.rootNode);

    mailStore.subscribe(() => {
      console.log(mailStore.getState())
      this.update();
    });
  }

  render() {
    return h('.container', [
      new Navigation(),
      new MailList()
    ]);
  }

  update() {
    const newTree = this.render();
    const patches = diff(this.tree, newTree);
    this.rootNode = patch(this.rootNode, patches);
    this.tree = newTree;
  }

  changeState() {
    setTimeout(() => {
      this.state.header = 'pek';
      this.update();
    }, 5000);
  }
}

export default App;
