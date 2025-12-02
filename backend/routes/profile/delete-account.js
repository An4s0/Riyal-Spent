const express = require("express");
const router = express.Router();
const { DatabaseSync } = require("node:sqlite");
const path = require("path");
const jwt = require("jsonwebtoken");

router.delete("/", async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid token" });
    }

    const token = header.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user_id = decoded.user_id;

    const db = new DatabaseSync(path.join(__dirname, "../../riyal-spent.db"));

    const user = db
      .prepare(`SELECT user_id FROM users WHERE user_id = ?`)
      .get(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    db.prepare("DELETE FROM expenses WHERE user_id = ?").run(user_id);

    db.prepare(`DELETE FROM users WHERE user_id = ?`).run(user_id);

    return res.status(200).json({
      message: "Account deleted successfully",
      user_id: user_id,
    });

  } catch (err) {
    console.error("DELETE /profile error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
