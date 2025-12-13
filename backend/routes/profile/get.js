const express = require("express");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const db = openDb();

    const user = db
      .prepare(
        `
        SELECT user_id, full_name, email, preferred_currency,
               member_since, last_activity
        FROM users
        WHERE user_id = ?
        `
      )
      .get(user_id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Profile fetched successfully",
      data: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        preferred_currency: user.preferred_currency || "SAR",
        member_since: user.member_since,
        last_activity: user.last_activity,
      },
    });
  } catch (err) {
    console.error("GET /profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
