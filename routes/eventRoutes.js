const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('user');
const Event = mongoose.model('event');

module.exports = app => {
  // retrieves a single event by its id
  app.get('/api/events/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.send(event);
  });

  // retrieves all events associated with the currently logged in user
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

  // Creates a new event
  app.post('/api/events', requireLogin, async (req, res) => {
    let {
      description,
      duration,
      durationUnit,
      name,
      calendarCheck,
      startTime
    } = req.body;
    duration *= durationUnit === 'hours' ? 60 : 1;
    let values = {
      description,
      duration,
      name,
      startTime,
      calendarCheck
    };
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

  // Updates a current event
  app.put('/api/events/:id', requireLogin, async (req, res) => {
    let {
      description,
      duration,
      durationUnit,
      name,
      calendarCheck,
      startTime
    } = req.body;
    duration *= durationUnit === 'hours' ? 60 : 1;
    let values = {
      description,
      duration,
      name,
      startTime,
      calendarCheck
    };
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, values);
      const user = await User.findById(req.user.id);
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // Deletes the event with the given id and removes it from the
  // createdEvents list of its associated User
  // Need to eventually delete it from the invitedEvents list as well.
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
