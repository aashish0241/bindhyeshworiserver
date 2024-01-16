const asyncHandler = require("express-async-handler");
const User = require("../model/UserModel");
const storage = require("../config/cloudinary");


// Register a user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation of request
  if (!name || !email || !password) {
    res.status(400).json({ error: "Please fill in all the required fields" });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ error: "Please enter a password with more than 8 characters" });
    return;
  }

  // Check if email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409).json({ error: 'Email already registered' });
    return;
  }

  // Create user
  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser) {
    const { _id, name, email, role } = newUser;

    res.status(201).json({
      _id,
      name,
      email,
      role,
    });
  } else {
    res.status(400).json({ error: "Invalid user data" });
  }
});

// Login for both user and admin
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Please enter valid email or password" });
    return;
  }

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ error: "User does not exist" });
    return;
  }

  // Check password (simple comparison for illustration purposes)
  const passwordIsCorrect = user.password === password;

  if (passwordIsCorrect) {
    const { _id, name, email, role } = user;

    res.status(200).json({
      _id,
      name,
      email,
      role,
    });
  } else {
    res.status(400).json({ error: "Please check your email and password" });
  }
});

// Logout the user
const logout = asyncHandler(async (req, res) => {
  // Clear any user-related data (in this case, no token/cookie is used)
  res.status(200).json({
    message: "Successfully Logout",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logout,
};
