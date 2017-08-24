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
  facebookId: String,
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'event'
    }
  ],
  invitedEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'event'
    }
  ]
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
