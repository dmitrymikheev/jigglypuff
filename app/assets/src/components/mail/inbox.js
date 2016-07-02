import h from 'virtual-dom/h';
import createElement from 'virtual-dom/create-element';

export default class Inbox {
  constructor() {
    return this.render();
  }

  render() {
    return h('.inbox');
  }
}
