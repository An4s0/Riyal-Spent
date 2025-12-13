const express = require("express");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const category_id = req.params.id;
    const db = openDb();

    const category = db
      .prepare(
        `
        SELECT category_id, user_id, name, icon, color_code, created_at
        FROM categories
        WHERE category_id = ? AND user_id = ?
        `
      )
      .get(category_id, user_id);

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({
      message: "Category fetched successfully",
      data: category,
    });
  } catch (err) {
    console.error("GET /categories/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
