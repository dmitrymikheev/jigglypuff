import App from 'application';
import Messages from 'components/messages';
import Message from 'components/message';
import newMessage from 'components/newMessage';

(() => {
  App.init([
    { url: '', component: Messages },
    { url: 'messages/:type', component: Messages },
    { url: 'message/:id', component: Message },
    { url: 'messages/new', component: newMessage }
  ]);
})();
