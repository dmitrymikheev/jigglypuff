import ComponentFactory from './componentFactory';

class Message {
  constructor() {
    console.log('init');
    this.render();
  }

  render() {
    this.template = '<div>Hello</div>';
  }
}

export default ComponentFactory.addComponent('Message', Message);
