const express = require("express");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.delete("/", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const db = openDb();

    const user = db
      .prepare("SELECT user_id FROM users WHERE user_id = ?")
      .get(user_id);

    if (!user) return res.status(404).json({ message: "User not found" });

    db.prepare("DELETE FROM expenses WHERE user_id = ?").run(user_id);
    db.prepare("DELETE FROM users WHERE user_id = ?").run(user_id);

    res.status(200).json({
      message: "Account deleted successfully",
      user_id,
    });
  } catch (err) {
    console.error("DELETE /profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
