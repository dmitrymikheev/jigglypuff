import Thunk from 'vdom-thunk';

export default class ThunkComponent {
  constructor(props) {
    this.props = props;
    this.state = this.getState() || {};
    this.beforeRender && this.beforeRender();

    return Thunk(this.render.bind(this), this.state);
  }
}
