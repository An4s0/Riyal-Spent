const express = require("express");
const router = express.Router();
const { DatabaseSync } = require("node:sqlite");
const path = require("path");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "Missing or invalid token" });

    const token = header.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user_id = decoded.user_id;

    const db = new DatabaseSync(path.join(__dirname, "../../riyal-spent.db"));
    const now = new Date().toISOString();

    db.prepare(`UPDATE users SET last_activity = ? WHERE user_id = ?`)
      .run(now, user_id);

    res.status(200).json({
      message: "Logged out successfully",
      logout_time: now,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
