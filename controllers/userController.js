
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

const loginDemo = async (req, res) => {
    const { email, password } = req.body;

    console.log({ email, password });

    const user = User.findByEmail(email);
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'incorrect' });
    }
    res.status(200).json(user);
}


module.exports = {
    register,
    loginDemo
};