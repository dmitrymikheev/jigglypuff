import App from 'application';
import MailList from 'components/mail';
import HomePage from 'components/home';
import Message from 'components/message';

(() => {
  App.init([
    { url: '', component: HomePage },
    {
      url: 'mail/:type',
      component: MailList,
      // child: {
      //   url: 'mail/:type/message/:id',
      //   component: Message
      // }
    },
    { url: 'mail/:type/message/:id', component: Message }
  ]);
})();
