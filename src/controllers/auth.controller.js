const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

/**
 * REGISTER
 * POST /api/auth/register
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ VALIDATION (VERY IMPORTANT)
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required"
      });
    }

    // ✅ CHECK EXISTING USER
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ HASH PASSWORD
    const hashed = await bcrypt.hash(password, 10);

    // ✅ CREATE USER
    const user = await User.create({
      uuid: uuidv4(),
      name,
      email,
      password: hashed,
      role
    });

    res.status(201).json({
      message: "Registered successfully",
      user: {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * LOGIN
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { uuid: user.uuid, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      accessToken: token,
      user: {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET CURRENT USER
 * GET /api/auth/me
 */
exports.me = async (req, res) => {
  try {
    const user = await User.findOne({ uuid: req.user.uuid }).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * FORGOT PASSWORD (MOCK)
 */
exports.forgot = async (req, res) => {
  res.json({ message: "Forgot password email sent (mock)" });
};

/**
 * RESET PASSWORD (MOCK)
 */
exports.reset = async (req, res) => {
  res.json({ message: "Password reset success (mock)" });
};

/**
 * DELETE ACCOUNT
 */
exports.deleteAccount = async (req, res) => {
  try {
    await User.deleteOne({ uuid: req.user.uuid });
    res.json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
