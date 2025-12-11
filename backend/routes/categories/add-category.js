// Purpose: Add new category

const express = require("express");
const router = express.Router();
const { openDb, getUserIdFromRequest } = require("../Database-connection-assistant");

router.post("/categories", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const { name, icon, color_code } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const db = openDb();
    const today = new Date().toISOString().slice(0, 10);

    const info = db
      .prepare(
        `INSERT INTO categories (user_id, name, icon, color_code, created_at)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(user_id, name, icon || null, color_code || null, today);

    const category = db
      .prepare(
        `SELECT category_id, user_id, name, icon, color_code, created_at
         FROM categories
         WHERE category_id = ?`
      )
      .get(info.lastInsertRowid);

    return res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (err) {
    console.error("POST /categories error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
