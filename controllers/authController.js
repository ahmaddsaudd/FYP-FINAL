const User = require('../models/User');
const passport = require('passport');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ success: false, error: info.message });
        req.logIn(user, (err) => {
            if (err) return next(err);
            res.status(200).json({ success: true, data: user });
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

exports.getUser = (req, res) => {
    res.status(200).json({ success: true, data: req.user });
};
