const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


// ✅ Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check user
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// router.post('/signup', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const userExist = await User.findOne({ email });
//     if (userExist) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       email,
//       password: hashedPassword
//     });

//     await user.save();

//     res.json({ message: 'User registered successfully' });

//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// ✅ Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ Protected Home Route
// router.get('/home', authMiddleware, (req, res) => {
//   res.json({
//     message: 'Welcome to Home Page 🎉',
//     // user: req.user
//   });
// });

router.get('/home', authMiddleware, (req, res) => {
  res.json({
    message: 'Welcome to Home Page 🎉',
    user: req.user
  });
});

module.exports = router;