import App from 'application';
import Router from 'router';
import Messages from 'components/messages';
import Message from 'components/message';
import newMessage from 'components/newMessage';

(() => {
  Router.init([
    { url: '', component: Messages },
    { url: 'messages/:type', component: Messages },
    { url: 'message/:id', component: Message },
    { url: 'messages/new', component: newMessage }
  ]);

  App.start();
})();
