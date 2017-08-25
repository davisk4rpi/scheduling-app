const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../../../models/User');
const Event = require('../../../models/Event');

describe('Associations', () => {
  let craig, event;

  beforeEach(async () => {
    craig = new User({ name: 'Craig Zuzek' });
    event = new Event({
      name: 'Work on Schedulizer',
      startTime: Date.now() + 3600,
      duration: 60
    });

    craig.createdEvents.push(event);

    await craig.save();
    await event.save();
  });

  it("saves a relation between a user and it's created event", async () => {
    const user = await User.findOne({ name: 'Craig Zuzek' }).populate(
      'createdEvents'
    );
    assert(user.createdEvents[0].name === 'Work on Schedulizer');
  });
});
