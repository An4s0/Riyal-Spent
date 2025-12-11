// Purpose: Get single category by id

const express = require("express");
const router = express.Router();
const { openDb, getUserIdFromRequest } = require("../Database-connection-assistant");

router.get("/categories/:id", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const category_id = req.params.id;
    const db = openDb();

    const category = db
      .prepare(
        `SELECT category_id, user_id, name, icon, color_code, created_at
         FROM categories
         WHERE category_id = ? AND user_id = ?`
      )
      .get(category_id, user_id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category fetched successfully",
      data: category,
    });
  } catch (err) {
    console.error("GET /categories/:id error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
