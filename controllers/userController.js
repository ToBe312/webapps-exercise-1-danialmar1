
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Profile = require('../models/profileModel');

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

    const newUser = await User.create({ email, username, password: hashedPassword });

    await Profile.createMany([
        {
            userId: newUser._id,
            name: "דובי",
            img: "bear.jpg"
        },
        {
            userId: newUser._id,
            name: "מיצי",
            img: "cat.jpg"
        },
        {
            userId: newUser._id,
            name: "שמשון",
            img: "bald-eagle.jpg"
        },
        {
            userId: newUser._id,
            name: "נחמה",
            img: "polar-bear.jpg"
        },
        {
            userId: newUser._id,
            name: "פיני",
            img: "penguin.jpg"
        }
    ]);

    res.status(201).json(newUser);
};        

const login = async (req, res) => {
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

    if (user.username === 'admin' || user.email === 'admin@admin.com') {
        req.session.isAdmin = true;
    }
    
    res.status(200).json(user);
}

const logout = (req, res) => {
    req.session.destroy(err => {
    if (err) {
        return res.status(500).json({ error: 'Could not log out, please try again' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful' });
  });
};


module.exports = {
    register,
    login,
    logout
};