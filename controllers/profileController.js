const ProfileModel = require('../models/profileModel');

const getProfilesByUserId = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ error: 'Not logged in' });
    }
    const profiles = await ProfileModel.findByUserId(userId);

    if (!profiles || profiles.length === 0) {
      return res.status(404).json({ error: 'No profiles found for this user' });
    }

    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const profileLogin = async (req, res) => {
    try {
        
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Not logged in' });
        }
        const profile = (await ProfileModel.findByUserAndId(userId, req.body.profileId))[0];
        //console.log(profile);
        //console.log(userId);
        if (!profile) {
            return res.status(404).json({ error: 'No profiles found for this user222' });
        }

        //console.log(profile._id.toString());
        req.session.profileId = profile._id.toString();

        return res.json(profile);
       
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// יצירת פרופיל חדש
const createProfile = async (req, res) => {
  const { name } = req.body;

  const profile = new ProfileModel.Profile({ userId: req.session.userId, name });
  await profile.save();
  res.json(profile);
};

// עדכון פרופיל
const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const profile = await ProfileModel.Profile.findByIdAndUpdate(id, { name }, { new: true });
  res.json(profile);
};

// מחיקת פרופיל
const deleteProfile = async (req, res) => {
  const { id } = req.params;
  await ProfileModel.Profile.findByIdAndDelete(id);
  res.json({ success: true });
};


module.exports = {
    getProfilesByUserId,
    profileLogin,
    createProfile,
    updateProfile,
    deleteProfile
};


