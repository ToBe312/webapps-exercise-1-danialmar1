const mongoose = require('mongoose');

const ErrorLogSchema = new mongoose.Schema({
  message: String,
  stack: String,
  path: String,
  body: Object,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now }
});

const ErrorLog = mongoose.model('ErrorLog', ErrorLogSchema);

const errorLogger = async (err, req, res, next) => {
  try {
    await ErrorLog.create({
      message: err.message,
      stack: err.stack,
      path: req.path,
      body: req.body,
      userId: req.session?.userId || null
    });
  } catch (loggingError) {
    console.error('Error logging error:', loggingError);
  }
  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorLogger;
