import Router from './router';
import App from './components/app';

(() => {
  Router.initRoot({
    root: App,
    children: [
      {
        path: '/filter',
        component: 'filter'
      }
    ]
  }, document.querySelector('#app'));
})();
