import h from 'virtual-dom/h';
import Component from 'components/base';

const OPENED_CLASS = 'dropdown-list--opened';

class Dropdown extends Component {
  handleClick(event) {
    const list = event.target.nextSibling;

    list.classList.toggle(OPENED_CLASS);
  }

  handleChange(event) {
    const value = event.target.data.value;
    const list = event.target.parentNode;

    list.classList.remove(OPENED_CLASS);
    this.props.onSelect(value);
  }

  render() {
    return (
      h('.dropdown', [
        h('.dropdown-label', {
          onclick: this.handleClick
        }, 'Actions'),
        h('ul.dropdown-list', [
          h('li.dropdown-item', {
            data: { value: 'mark' },
            onclick: this.handleChange.bind(this)
          }, 'Mark as important'),
          h('li.dropdown-item', {
            data: { value: 'unmark' },
            onclick: this.handleChange.bind(this)
          }, 'Unmark as important'),
          h('li.dropdown-item', {
            data: { value: 'delete' },
            onclick: this.handleChange.bind(this)
          }, 'Delete messages')
        ])
      ])
    );
  }
}

export default Dropdown;
