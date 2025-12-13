const express = require("express");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const db = openDb();

    const now = new Date().toISOString();

    db.prepare("UPDATE users SET last_activity = ? WHERE user_id = ?").run(
      now,
      user_id
    );

    res.status(200).json({
      message: "Logged out successfully",
      logout_time: now,
    });
  } catch (err) {
    console.error("POST /auth/logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
