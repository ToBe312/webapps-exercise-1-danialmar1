
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const register = async (req, res) => {
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log({ email, username, password });

    if (await User.findByUsername(username)) {
        return res.status(409).json({ error: 'Username already exists' });
    }
    else if (await User.findByEmail(email)) {
        return res.status(409).json({ error: 'Email already exists' });
    }

  const newUser = User.create({ email, username, password: hashedPassword });
  res.status(201).json(newUser);
};        

const loginDemo = async (req, res) => {
    const { email, password } = req.body;

    console.log({ email, password });

    const user = await User.findByEmail(email);
    if (!user) {
        return res.status(401).json({ error: 'incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'incorrect' });
    }
    
    req.session.userId = user._id;
    res.status(200).json(user);
}


module.exports = {
    register,
    loginDemo
};