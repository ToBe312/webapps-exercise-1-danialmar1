const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
});

module.exports = mongoose.model('Genre', GenreSchema);
