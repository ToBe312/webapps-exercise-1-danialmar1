const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  img: { type: String },
  createdAt: { type: Date, default: Date.now }
});


const Profile = mongoose.model('Profile', ProfileSchema);


async function getAll() {
  return await Profile.find().populate('userId');
}

async function findById(_id) {
  return await Profile.find({ _id }).populate('userId');
}

async function findByUserId(userId) {
  return await Profile.find({ userId }).populate('userId');
}

async function create(profileData) {
  const profile = new Profile(profileData);
  return await profile.save();
}

async function createMany(profilesData) {
  return await Profile.create(profilesData);
}

async function update(id, newData) {
  return await Profile.findByIdAndUpdate(id, newData, { new: true }).populate('userId');
}

async function remove(id) {
  return await Profile.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  findById,
  findByUserId,
  create,
  createMany,
  update,
  remove
};
