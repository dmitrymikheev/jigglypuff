var faker = require('faker');
var _ = require('lodash');

const TYPES = [
  'inbox',
  'drafts',
  'starred',
  'deleted'
]

module.exports = function() {
  return {
    messages: _.times(100, n => {
      return {
        id: ++n,
        title: faker.random.word(),
        author: faker.random.words(),
        avatar: faker.internet.avatar(),
        sender: faker.internet.email(),
        type: TYPES[_.random(0, 3)],
        body: faker.random.words()
      }
    })
  }
}
