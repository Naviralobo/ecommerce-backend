const User = require("../models/user");
const logger = require("../utils/logger");

exports.getDashboard = async (req, res) => {
  try {
    logger.info("Dashboard page accessed");

    const totalUsers = await User.countDocuments();
    const recentUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).render("dashboard", {
      title: "Dashboard",
      totalUsers,
      users: recentUsers,
    });
  } catch (error) {
    logger.error("Error loading dashboard", {
      error: error.message,
      stack: error.stack,
    });

    res.status(500).json({ error: "Failed to load dashboard" });
  }
};