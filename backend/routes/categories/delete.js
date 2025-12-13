const express = require("express");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const category_id = req.params.id;
    const db = openDb();

    const exists = db
      .prepare(
        `
        SELECT category_id
        FROM categories
        WHERE category_id = ? AND user_id = ?
        `
      )
      .get(category_id, user_id);

    if (!exists) return res.status(404).json({ message: "Category not found" });

    const used = db
      .prepare("SELECT 1 FROM expenses WHERE category_id = ? LIMIT 1")
      .get(category_id);
    if (used) return res.status(400).json({ message: "Category is in use" });

    db.prepare(
      "DELETE FROM categories WHERE category_id = ? AND user_id = ?"
    ).run(category_id, user_id);

    res.status(200).json({
      message: "Category deleted successfully",
      category_id,
    });
  } catch (err) {
    console.error("DELETE /categories/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
