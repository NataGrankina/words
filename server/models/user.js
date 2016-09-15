var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/words');
var userSchema = new mongoose.Schema({
    id: String,
    email: String
});

module.exports = mongoose.model('User', userSchema);