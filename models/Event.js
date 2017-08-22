const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
  name: String,
  startTime: Date,
  endTime: Date
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event;
