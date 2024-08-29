const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        console.log("user login token : ", token)
        user.tokens.push({ token });
        await user.save();
        res.json({ token });
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user details
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user and populate uploaded and liked audios
    const user = await User.findById(userId)
      .populate('uploadedAudios')
      .populate('likedAudios');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// User logout (simple implementation)
exports.logout = (req, res) => {
  // This is a simple implementation. In practice, you might want to handle JWT invalidation.
  res.status(200).json({ message: 'Logged out successfully' });
};
