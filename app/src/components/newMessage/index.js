import h from 'virtual-dom/h';
import Component from 'components/base';
import { titleIsValid, messageIsValid } from 'helpers/validation';
import Input from 'components/input';
import { setField, sendMessage, submitMessage } from 'actions/message';
import MessageStore from 'stores/message';

class NewMessage extends Component {
  getState() {
    return MessageStore.getState().message;
  }

  onChangeField(event) {
    const name = event.target.name;
    const value = event.target.value;

    MessageStore.dispatch(setField(name, value));
  }

  onSubmit(event) {
    event.preventDefault();
    const isValid = this.isValid(this.state.title, this.state.body);

    if (isValid) {
      MessageStore.dispatch(sendMessage());
    }

    MessageStore.dispatch(submitMessage());
  }

  isValid(title, message) {
    return titleIsValid(title) && messageIsValid(message);
  }

  render() {
    return (
      h('form.form', { onsubmit: this.onSubmit.bind(this) }, [
        new Input({
          label: 'Title',
          className: 'form-control',
          name: 'title',
          value: this.state.title,
          onChange: this.onChangeField,
          validation: titleIsValid,
          submitted: this.state.submitted
        }),
        new Input({
          tag: 'textarea',
          label: 'Message',
          className: 'form-control',
          name: 'body',
          value: this.state.body,
          onChange: this.onChangeField,
          validation: messageIsValid,
          submitted: this.state.submitted
        }),
        h('.form-group', [
          h('button', { type: 'submit', className: 'button form-submit' }, 'Send')
        ])
      ])
    );
  }
}

export default NewMessage;
