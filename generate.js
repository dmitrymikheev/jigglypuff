var faker = require('faker');
var _ = require('lodash');

const TYPES = [
  'inbox',
  'drafts',
  'deleted'
]

module.exports = function() {
  return {
    messages: _.times(100, n => {
      return {
        id: ++n,
        title: faker.random.word(),
        author: faker.internet.userName(),
        avatar: faker.internet.avatar(),
        sender: faker.internet.email(),
        type: TYPES[_.random(0, 2)],
        starred: !!(_.random(0, 1)),
        body: (function() {
          return _.times(10, n => {
            return faker.lorem.paragraphs()
          }).join('');
        })()
      }
    })
  }
}
