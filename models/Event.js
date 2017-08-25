const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
  name: String,
  description: String,
  duration: Number,
  startTime: Date
});

// Use 'function()' instead of '=>' to maintain scope to 'this' of the specific user
EventSchema.virtual('endTime').get(function() {
  // duration is in minutes
  return this.startTime + this.duration * 60 * 1000;
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event;
