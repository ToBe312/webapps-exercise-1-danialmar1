const mongoose = require('mongoose');

const RequestLogSchema = new mongoose.Schema({
  method: String,
  path: String,
  body: Object,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now }
});

const RequestLog = mongoose.model('RequestLog', RequestLogSchema);

const requestLogger = async (req, res, next) => {
  try {
    await RequestLog.create({
      method: req.method,
      path: req.path,
      body: req.body,
      userId: req.session?.userId || null
    });
  } catch (err) {
    console.error('Error logging request:', err);
  }
  next();
};

module.exports = requestLogger;
