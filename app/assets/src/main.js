import App from 'application';
import Messages from 'components/messages';
import HomePage from 'components/home';
import Message from 'components/message';
import newMessage from 'components/newMessage';

(() => {
  App.init([
    { url: '', component: HomePage },
    { url: 'messages/:type', component: Messages },
    { url: 'messages/:type/message/:id', component: Message },
    { url: 'messages/new', component: newMessage }
  ]);
})();
