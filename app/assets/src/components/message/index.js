import h from 'virtual-dom/h';

class Message {
  constructor() {
    return this.render();
  }

  render() {
    return (
      h('.message', 'Some message')
    );
  }
}
export default Message;
