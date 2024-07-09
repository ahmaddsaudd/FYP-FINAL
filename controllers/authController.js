const User = require('../models/User');
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.login = async (req, res) =>{
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).send('User not found');
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(401).send('Invalid credentials');
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// exports.logout = (req, res) => {
//     req.logout();
//     res.status(200).json({ success: true, message: 'Logged out successfully' });
// };

// exports.getUser = (req, res) => {
    
//     res.status(200).json({ success: true, data: req.user });
// };
