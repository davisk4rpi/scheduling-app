const assert = require('assert');
const mongoose = require('mongoose');

const User = require('../models/User');

describe('Creating Users', () => {
  it('saves a user', async () => {
    const craig = new User({ name: 'Craig Zuzek' });
    assert(craig.isNew);
    await craig.save();
    assert(!craig.isNew);
  });
});
