const express = require("express");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const db = openDb();

    const categories = db
      .prepare(
        `
        SELECT category_id, user_id, name, icon, color_code, created_at
        FROM categories
        WHERE user_id = ?
        ORDER BY name ASC
        `
      )
      .all(user_id);

    res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (err) {
    console.error("GET /categories error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
