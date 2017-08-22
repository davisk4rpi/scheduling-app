const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
  name: String,
  startTime: Date,
  endTime: Date
});

module.exports = EventSchema;
