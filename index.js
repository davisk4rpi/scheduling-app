const express = require('express');
const mongoose = require('mongoose');

const keys = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useMongoClient: true
});

const app = express();

const PORT = 5000;
app.listen(PORT);
