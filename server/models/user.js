const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  translations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Translation'
  }]
});

module.exports = mongoose.model('User', userSchema);
