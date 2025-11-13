const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin:  { type: Boolean, default: false }
});


const User = mongoose.model('User', UserSchema);


const getAll = async () => {
  return await User.find();
}

const findByUsername = async (username) => {
  return await User.findOne({ username });
}

const findByEmail = async (email) => {
  return await User.findOne({ email });
}

const create = async (userData) => {
  const user = new User(userData);
  return await user.save();
}

const update = async (id, newData) => {
  return await User.findByIdAndUpdate(id, newData, { new: true });
}

const remove = async (id) => {
  return await User.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  findByUsername,
  findByEmail,
  create,
  update,
  remove
};
