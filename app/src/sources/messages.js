import qwest from 'qwest';
import { config } from 'config';
import notifications from 'services/notifications';

export default class MessagesSource {
  static fetch(params) {
    return qwest
      .get(this.urlRoot, { ...params })
      .then((xhr, response) => {
        notifications.success('Receive messages');

        return response;
      })
      .catch((e, xhr, response) => {
        notifications.error(e.message);
      });
  }

  static get(id) {
    return qwest
      .get(`${this.urlRoot}/${id}`)
      .then((xhr, response) => response);
  }

  static update(message) {
    return qwest
      .put(`${this.urlRoot}/${message.id}`, { ...message })
      .then((xhr, response) => response);
  }

  static create(message) {
    return qwest
      .post(this.urlRoot, { ...message })
      .then((xhr, response) => {
        notifications.success('Message saved to drafts');

        return response;
      });
  }
}

MessagesSource.urlRoot = `${config.apiPath}/messages`;
