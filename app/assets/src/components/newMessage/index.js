import h from 'virtual-dom/h';
import Thunk from 'vdom-thunk';
import { setField, sendMessage } from 'actions/message';
import messageStore from 'stores/message';

class newMessage {
  constructor() {
    this.state = messageStore.getState().message;

    return Thunk(this.render.bind(this), this.state);
  }

  onChangeField(event) {
    const name = event.target.name;
    const value = event.target.value;

    messageStore.dispatch(setField(name, value));
  }

  onSubmit(event) {
    event.preventDefault();
    messageStore.dispatch(sendMessage());
  }

  render() {
    return (
      h('form.form', { onsubmit: this.onSubmit }, [
        h('label.form-group', [
          'Title',
          h('input.form-control', {
            name: 'title',
            value: this.state.title,
            onkeyup: this.onChangeField
          })
        ]),
        h('label.form-group', [
          'Message',
          h('textarea.form-control', {
            name: 'body',
            value: this.state.body,
            onkeyup: this.onChangeField
          })
        ]),
        h('.form-group', [
          h('button', { type: 'submit', className: 'button form-submit' }, 'Send')
        ])
      ])
    );
  }
}

export default newMessage;
