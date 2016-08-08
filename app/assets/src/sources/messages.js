import qwest from 'qwest';
import { config } from 'config';

export default class MessagesSource {
  static fetch(params) {
    return qwest
      .get(this.urlRoot, { ...params })
      .then((xhr, response) => response);
  }

  static get(id) {
    return qwest
      .get(`${this.urlRoot}/${id}`)
      .then((xhr, response) => response);
  }

  static update(email) {
    return qwest
      .put(`${this.urlRoot}/${email.id}`, { ...email })
      .then((xhr, response) => response);
  }

  static create(message) {
    return qwest
      .post(this.urlRoot, { ...message })
      .then((xhr, response) => response);
  }
}

MessagesSource.urlRoot = `${config.apiPath}/messages`
