function adminMiddleware(req, res, next) {
  const user = req.user; // Assuming user information is attached to the request object
  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: "Forbidden: Admin access required" });
  }
  next();
}

module.exports = adminMiddleware;
