const express = require("express");
const router = express.Router();
const { openDb, getUserIdFromRequest } = require("../Database-connection-assistant");

router.get("/expenses", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const db = openDb();
    const { category_id, search } = req.query;

    let sql =
      `SELECT expense_id, user_id, category_id, amount, date, description,
              created_at, last_modified
       FROM expenses
       WHERE user_id = ?`;
    const params = [user_id];

    if (category_id) {
      sql += " AND category_id = ?";
      params.push(category_id);
    }

    if (search) {
      sql += " AND description LIKE ?";
      params.push("%" + search + "%");
    }

    sql += " ORDER BY date DESC, expense_id DESC";

    const expenses = db.prepare(sql).all(...params);

    return res.status(200).json({
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (err) {
    console.error("GET /expenses error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

