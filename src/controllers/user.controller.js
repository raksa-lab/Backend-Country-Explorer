const User = require("../models/user.model");

// ✅ GET CURRENT USER (by token UUID)
exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({ uuid: req.user.uuid }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👑 ADMIN: GET USER BY UUID
exports.getUserById = async (req, res) => {
  try {
    const { uuid } = req.params;

    const user = await User.findOne({ uuid }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
