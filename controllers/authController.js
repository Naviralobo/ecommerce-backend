const bcrypt = require("bcryptjs");
const User = require("../models/user");
const logger = require("../utils/logger");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    logger.info("Signup request received", { name, email, role });
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    //before saving to db, hash it and save
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user); // Generate JWT token for the user
    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    logger.error("Error during signup", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info("Login request received", { email });
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    logger.error("Error during login", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: error.message });
  }
};
