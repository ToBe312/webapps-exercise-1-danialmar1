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

module.exports = {
    getProfilesByUserId,
    profileLogin
};


