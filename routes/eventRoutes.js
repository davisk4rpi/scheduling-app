const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('user');
const Event = mongoose.model('event');
const eventValues = require('./route_helpers/events');

module.exports = app => {
  app.get('/api/events/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.send(event);
  });
  app.get('/api/events', requireLogin, async (req, res) => {
    const user = await User.findById(req.user.id);
    const eventIds = user.createdEvents;
    const events = await Event.find({
      _id: {
        $in: eventIds
      }
    });
    res.send(events);
  });
  app.post('/api/events', requireLogin, async (req, res) => {
    values = eventValues(req.body);
    const event = new Event(values);
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

  app.put('/api/events/:id', requireLogin, async (req, res) => {
    values = eventValues(req.body);
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, values);
      const user = await User.findById(req.user.id);
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.delete('/api/events/:id', requireLogin, async (req, res) => {
    const user = await User.findById(req.user.id);
    const event = await Event.findById(req.params.id);
    const eventIds = user.createdEvents.filter(id => {
      console.log(id.toString() !== req.params.id);
      return id.toString() !== req.params.id;
    });
    console.log(eventIds);
    await user.update({ createdEvents: eventIds });
    await event.remove();
    const events = await Event.find({
      _id: {
        $in: eventIds
      }
    });
    res.send(events);
  });
};
