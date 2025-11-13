
const User = require('../models/userModel');

const register = async (req, res) => {
    const { email, username, password } = req.body;

    console.log({ email, username, password });

    if (User.findByUsername(username)) {
        return res.status(409).json({ error: 'Username already exists' });
    }
    else if (User.findByEmail(email)) {
        return res.status(409).json({ error: 'Email already exists' });
    }

  const newUser = User.create({ email, username, password });
  res.status(201).json(newUser);
};


module.exports = {
    register
};