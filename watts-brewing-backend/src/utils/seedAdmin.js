const User = require("../models/user");
const bcrypt = require("bcryptjs");

const seedAdmin = async () => {
  try {
    const existing = await User.findOne({ username: "admin" });

    if (!existing) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await User.create({
        username: "admin",
        password: hashedPassword,
      });

      console.log("Default admin user created");
    } else {
      console.log("Admin already exists");
    }
  } catch (err) {
    console.error("Seed error:", err);
  }
};

module.exports = seedAdmin;