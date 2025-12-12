const express = require("express");
const router = express.Router();
const { openDb, getUserIdFromRequest } = require("../Database-connection-assistant");

router.delete("/categories/:id", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const category_id = req.params.id;
    const db = openDb();

    const existing = db
      .prepare(
        `SELECT category_id
         FROM categories
         WHERE category_id = ? AND user_id = ?`
      )
      .get(category_id, user_id);

    if (!existing) {
      return res.status(404).json({ message: "Category not found" });
    }

    // ملاحظة: لو حابين تمنعون حذف فئة عليها مصروفات،
    // هنا تعملون CHECK في جدول expenses قبل الحذف.

    db.prepare(
      "DELETE FROM categories WHERE category_id = ? AND user_id = ?"
    ).run(category_id, user_id);

    return res.status(200).json({
      message: "Category deleted successfully",
      category_id,
    });
  } catch (err) {
    console.error("DELETE /categories/:id error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

