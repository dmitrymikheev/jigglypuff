import App from 'application';
import Messages from 'components/messages';
import HomePage from 'components/home';
import Message from 'components/message';
import newMessage from 'components/newMessage';

(() => {
  App.init([
    { url: '', component: HomePage },
    { url: 'mail/:type', component: Messages },
    { url: 'mail/:type/message/:id', component: Message },
    { url: 'mail/new', component: newMessage }
  ]);
})();
