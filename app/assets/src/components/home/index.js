import h from 'virtual-dom/h';

class HomePage {
  constructor() {
    return this.render();
  }

  render() {
    return h('h1', 'Home Page');
  }
}

export default HomePage;
