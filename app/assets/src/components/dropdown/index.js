import h from 'virtual-dom/h';
import Component from 'components';

class Dropdown extends Component {
  handleChange(event) {
    const value = event.target.value;

    this.props.onSelect(value);
  }

  render() {
    return (
      h('select', {
        onchange: this.handleChange.bind(this)
      }, [
        h('option', 'Actions'),
        h('option', { value: 'important' }, 'Mark as important'),
        h('option', { value: 'delete' }, 'Delete selected')
      ])
    );
  }
}

export default Dropdown;
