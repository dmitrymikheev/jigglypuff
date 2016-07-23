import h from 'virtual-dom/h';

class Item {
  constructor(options) {
    this.options = options;
    return this.render();
  }

  render() {
    return h('.item', [this.options.title]);
  }
}

export default Item;
