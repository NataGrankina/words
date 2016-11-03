const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  translation: String,
  language: String,
  word: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Word'
  }
});

module.exports = mongoose.model('Translation', translationSchema);
