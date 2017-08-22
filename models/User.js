const mongoose = require('mongoose');
const EventSchema = require('./Event');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: String,
  googleId: String,
  events: [EventSchema]
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
