import qwest from 'qwest';
import { config } from 'config';

export default class MessagesSource {
  static fetch(type) {
    console.log(this.urlRoot)
    return qwest
      .get(this.urlRoot, { type })
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
}

MessagesSource.urlRoot = `${config.apiPath}/messages`
