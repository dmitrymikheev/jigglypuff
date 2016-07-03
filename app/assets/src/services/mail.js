import qwest  from 'qwest';

class MailService {
  getMails() {
    return qwest.get('http://localhost:3000/emails')
      .then((xhr, response) => {
        return response;
      });
  }
}

export default new MailService;
