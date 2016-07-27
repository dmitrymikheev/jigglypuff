import App from 'application';
import MailList from 'components/mail';
import HomePage from 'components/home';

(() => {
  App.init([
    { url: '', component: HomePage },
    { url: 'mail/:type', component: MailList }
  ]);
})();
