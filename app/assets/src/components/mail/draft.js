import h from 'virtual-dom/h';
import createElement from 'virtual-dom/create-element';

export default class Draft {
  constructor() {
    return this.render();
  }

  render() {
    return h('.draft');
  }
}
