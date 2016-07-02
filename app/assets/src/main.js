import $ from 'jquery';
import History from './history';
import Root from './components/root';
import Inbox from './components/mail/inbox';
import Draft from './components/mail/draft';

(() => {
  new History([
    {
      url: '/',
      component: Root,
      children: [
        {
          url: '/inbox',
          component: Inbox
        },
        {
          url: '/draft',
          component: Draft
        }
      ]
    }
  ],
  document.getElementById('app'));
})();
