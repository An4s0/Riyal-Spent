const express = require("express");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const category_id = req.params.id;
    const { name, icon, color_code } = req.body;

    const db = openDb();

    const current = db
      .prepare(
        `
        SELECT name, icon, color_code
        FROM categories
        WHERE category_id = ? AND user_id = ?
        `
      )
      .get(category_id, user_id);

    if (!current)
      return res.status(404).json({ message: "Category not found" });

    const newName = name ?? current.name;
    const newIcon = icon ?? current.icon;
    const newColor = color_code ?? current.color_code;

    db.prepare(
      `
      UPDATE categories
      SET name = ?, icon = ?, color_code = ?
      WHERE category_id = ? AND user_id = ?
      `
    ).run(newName, newIcon, newColor, category_id, user_id);

    const updated = db
      .prepare(
        `
        SELECT category_id, user_id, name, icon, color_code, created_at
        FROM categories
        WHERE category_id = ? AND user_id = ?
        `
      )
      .get(category_id, user_id);

    res.status(200).json({
      message: "Category updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("PUT /categories/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
