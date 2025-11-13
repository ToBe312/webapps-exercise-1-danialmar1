const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  type: String,
  path: String,
  method: String,
  body: Object,
  message: String,
  stack: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', LogSchema);
