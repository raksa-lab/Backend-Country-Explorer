const User = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
  res.json(await User.find().select("-password"));
};

exports.deleteUser = async (req, res) => {
  await User.deleteOne({ uuid: req.params.uuid });
  res.json({ message: "User deleted" });
};

exports.updateUserRole = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { uuid: req.params.uuid },
    { role: req.body.role },
    { new: true }
  );
  res.json(user);
};
