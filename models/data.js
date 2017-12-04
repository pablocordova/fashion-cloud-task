const mongoose = require('mongoose');

const data_squema = mongoose.Schema({
  key: { type: String, required: true, unique: true },
  data: { type: String, required: true }
});

const data = mongoose.model('Data', data_squema);

module.exports = data;