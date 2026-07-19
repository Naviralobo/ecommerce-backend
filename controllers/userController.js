const User = require("../models/user");
const logger = require("../utils/logger");

exports.getUsers = async (req, res) => {
  try {
    logger.info("Fetching all users");

    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).render("users", {
      title: "Users",
      users,
    });
  } catch (error) {
    logger.error("Error fetching users", {
      error: error.message,
      stack: error.stack,
    });

    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    logger.info("Fetching user by id", { userId: req.params.id });

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).render("user-detail", {
      title: "User Details",
      user,
    });
  } catch (error) {
    logger.error("Error fetching user", {
      userId: req.params.id,
      error: error.message,
      stack: error.stack,
    });

    res.status(500).json({ error: "Failed to fetch user" });
  }
};