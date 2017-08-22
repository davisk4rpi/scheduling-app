const mongoose = require('mongoose');
const keys = require('../config/dev');

mongoose.Promise = global.Promise;

// 'before' runs once
before(done => {
  // 'localhost' is where the mongodb is located
  // 'users_test' is the name of the database
  mongoose.connect(keys.mongoURI, {
    // new requirement for mongoose >= 4.11.0
    useMongoClient: true
  });

  // 'once' tells mongoose to wait until the first response
  // 'open' and 'error' are specific names, they are part of the mongoose docs
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', error => {
      console.warn('Warning', error);
    });
});

beforeEach(done => {
  const { users, events } = mongoose.connection.collections;
  users.drop(() => {
    events.drop(() => {
      done();
    });
  });
});
