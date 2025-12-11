// Purpose: Update category name, icon, or color_code

const express = require("express");
const router = express.Router();
const { openDb, getUserIdFromRequest } = require("../Database-connection-assistant");

router.put("/categories/:id", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const category_id = req.params.id;
    const { name, icon, color_code } = req.body;

    const db = openDb();

    const current = db
      .prepare(
        `SELECT category_id, user_id, name, icon, color_code, created_at
         FROM categories
         WHERE category_id = ? AND user_id = ?`
      )
      .get(category_id, user_id);

    if (!current) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newName = name ?? current.name;
    const newIcon = icon ?? current.icon;
    const newColor = color_code ?? current.color_code;

    db.prepare(
      `UPDATE categories
       SET name = ?, icon = ?, color_code = ?
       WHERE category_id = ? AND user_id = ?`
    ).run(newName, newIcon, newColor, category_id, user_id);

    const updated = db
      .prepare(
        `SELECT category_id, user_id, name, icon, color_code, created_at
         FROM categories
         WHERE category_id = ? AND user_id = ?`
      )
      .get(category_id, user_id);

    return res.status(200).json({
      message: "Category updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("PUT /categories/:id error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

