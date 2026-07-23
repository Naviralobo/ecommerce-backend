

const jwt = require("jsonwebtoken");

function protect(req, res, next) {
  const header = req.headers.authorization; //Bearer "token"
  if (!header) {
    return res
      .status(401)
      .json({ error: "Access denied. Invalid token format" });
  }
  const token = header.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

function restrictTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied. Insufficient permissions" });
    }
    next();
  }
}

module.exports = { protect, restrictTo };