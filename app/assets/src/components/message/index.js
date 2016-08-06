import h from 'virtual-dom/h';
import Thunk from 'vdom-thunk';
import { fetchMessageIfNeed } from 'actions/mail';
import mailStore from 'stores/mail';

class Message {
  constructor(params) {
    const id = params[1];
    // this.type = 'Thunk';
    this.state = mailStore.getState().mail.message;
    mailStore.dispatch(fetchMessageIfNeed(id));

    return Thunk(this.render.bind(this), this.state);
  }

  render() {
    console.log(this.state);
    return (
      h('.message', [
        h('.message-title', this.state.title),
        h('.message-author', this.state.author),
        h('.message-body', this.state.body)
      ])
    );
  }
}
export default Message;
