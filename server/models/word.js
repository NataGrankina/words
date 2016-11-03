const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: String,
  language: String
});

module.exports = mongoose.model('Word', wordSchema);
