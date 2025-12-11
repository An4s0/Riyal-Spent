// Purpose: List all categories for logged-in user

const express = require("express");
const router = express.Router();
const { openDb, getUserIdFromRequest } = require("../Database-connection-assistant");

router.get("/categories", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const db = openDb();

    const categories = db
      .prepare(
        `SELECT category_id, user_id, name, icon, color_code, created_at
         FROM categories
         WHERE user_id = ?
         ORDER BY name ASC`
      )
      .all(user_id);

    return res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (err) {
    console.error("GET /categories error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
