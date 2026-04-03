const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({ message: "You are not logged in" });
  }

  try {
    const decoded = jwt.verify(token, "Notes-App-Secret");

    if (decoded.username) {
      req.username = decoded.username;
      next();
    } else {
      res.status(403).json({ message: "Invalid token payload" });
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = {
  authMiddleware,
};
