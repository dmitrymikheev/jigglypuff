import h from 'virtual-dom/h';
import Thunk from 'vdom-thunk';
import { capitalize } from 'lodash';

class Input {
  constructor(props) {
    this.props = props;

    return Thunk(this.render.bind(this), this.props);
  }

  renderError() {
    const { value, validation } = this.props;
  }

  renderError() {
    const { validation, value, name, submitted } = this.props;

    if (!this.isValid()) {
      return h('.form-error', `${capitalize(name)} is invalid`);
    }

    return h();
  }

  isValid() {
    const { validation, value, submitted } = this.props;

    return !value.length && !submitted ? true : validation(value);
  }

  render() {
    const {
      label,
      name,
      className,
      value,
      onChange
    } = this.props;
    const tag = this.props.tag || 'input';
    const error = this.renderError();

    return (
      h('label.form-group', [
        label,
        h(tag, {
          name,
          className,
          value,
          onchange: onChange
        }),
        error
      ])
    );
  }
}

export default Input;
