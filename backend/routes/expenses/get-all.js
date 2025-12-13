const express = require("express");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const { category_id, search } = req.query;
    const db = openDb();

    let sql = `
      SELECT expense_id, user_id, category_id, amount, date, description,
             created_at, last_modified
      FROM expenses
      WHERE user_id = ?
    `;
    const params = [user_id];

    if (category_id) {
      sql += " AND category_id = ?";
      params.push(category_id);
    }

    if (search) {
      sql += " AND description LIKE ?";
      params.push(`%${search}%`);
    }

    sql += " ORDER BY date DESC, expense_id DESC";

    const expenses = db.prepare(sql).all(...params);

    res.status(200).json({
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (err) {
    console.error("GET /expenses error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
