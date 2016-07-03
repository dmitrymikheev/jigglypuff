import h from 'virtual-dom/h';
import createElement from 'virtual-dom/create-element';
import Navigation from './navigation/navigation';
import MailList from './mail/list';

class App {
  constructor(children = []) {
    this.children = children;
    return this.render();
  }

  render() {
    return h('.container', [
      new Navigation(),
      new MailList()
    ]);
  }
}

export default App;
