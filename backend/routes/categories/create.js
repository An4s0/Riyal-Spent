const express = require("express");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const { name, icon, color_code } = req.body;

    if (!name)
      return res.status(400).json({ message: "Category name is required" });

    const db = openDb();
    const today = new Date().toISOString().slice(0, 10);

    const result = db
      .prepare(
        `
        INSERT INTO categories (user_id, name, icon, color_code, created_at)
        VALUES (?, ?, ?, ?, ?)
        `
      )
      .run(user_id, name, icon ?? null, color_code ?? null, today);

    const category = db
      .prepare(
        `
        SELECT category_id, user_id, name, icon, color_code, created_at
        FROM categories
        WHERE category_id = ?
        `
      )
      .get(result.lastInsertRowid);

    res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (err) {
    console.error("POST /categories error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
