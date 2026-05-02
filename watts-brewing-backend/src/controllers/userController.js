const User = require("../models/user");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

module.exports = { getUser };