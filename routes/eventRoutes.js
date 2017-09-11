const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('user');
const Event = mongoose.model('event');

module.exports = app => {
  app.post('/api/events', requireLogin, async (req, res) => {
    let {
      description,
      duration,
      durationUnit,
      name,
      startTimeDate,
      startTimeTime,
      calendarCheck
    } = req.body;
    let startTime;
    if (startTimeDate) {
      const startDate = Date.parse(startTimeDate);
      startTimeTime = new Date(startTimeTime);
      const time =
        (startTimeTime.getHours() * 60 + startTimeTime.getMinutes()) *
        60 *
        1000;
      startTime = startDate + time;
    } else {
      startTime = Date.now();
    }
    duration *= durationUnit === 'hours' ? 60 : 1;
    const event = new Event({
      description,
      duration,
      name,
      startTime,
      calendarCheck
    });
    try {
      const user = await User.findById(req.user.id);
      const savedEvent = await event.save();
      user.createdEvents.push(savedEvent);
      const updatedUser = await user.save();
      res.send(updatedUser);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
