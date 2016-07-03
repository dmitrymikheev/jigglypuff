import h from 'virtual-dom/h';

class Item {
  constructor(options) {
    this.options = options;
    return this.render();
  }

  render() {
    console.log(this.options)
    debugger
    return h('.item', [this.options.title]);
  }
}

export default Item;
