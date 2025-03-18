const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const dotenv = require("dotenv");
const mongoose = require('mongoose');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .message(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required(),
});

// ✅ SIGN IN (Login User)
exports.signin = async (req, res) => {
  try {
    const { error } = signinSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role }, // ✅ Include role in token
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role, // ✅ Return role in response
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
};

// ✅ LOGOUT (Clear Token)
exports.logoutUser = (req, res) => {
  res.clearCookie("authToken");
  return res.status(200).json({ message: "Logged out successfully" });
};

exports.getUserProfile = async (req, res) => {
  try {
    // Extract token from req.body or cookies
    const token = req.body.token || req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded User ID from token:", decoded._id);  // Use _id instead of userId

    // Validate user ID
    if (!decoded._id || !mongoose.Types.ObjectId.isValid(decoded._id)) {  // Use _id here as well
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Fetch user profile from database
    const user = await User.findById(decoded._id).select("-password");  // Use _id here too

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user, message: "User profile fetched successfully" });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


