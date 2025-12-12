const { DatabaseSync } = require("node:sqlite");
const path = require("path");
const jwt = require("jsonwebtoken");

function openDb() {
  return new DatabaseSync(path.join(__dirname, "../../riyal-spent.db"));
}

function getUserIdFromRequest(req, res) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid token" });
    return null;
  }
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user_id;
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
    return null;
  }
}

module.exports = { openDb, getUserIdFromRequest };
