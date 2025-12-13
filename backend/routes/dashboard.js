const express = require("express");

const openDb = require("../utils/db");
const { getUserFromToken } = require("../utils/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const { period = "month" } = req.query; 

    const db = openDb();

    const totals = db
      .prepare(
        `
        SELECT 
          SUM(amount)  AS total_amount,
          COUNT(*)     AS total_count,
          AVG(amount)  AS average_amount,
          MIN(date)    AS first_expense,
          MAX(date)    AS last_expense
        FROM expenses
        WHERE user_id = ?
        `
      )
      .get(user_id);

    const byCategory = db
      .prepare(
        `
        SELECT
          c.category_id,
          c.name AS category_name,
          SUM(e.amount) AS total,
          COUNT(e.expense_id) AS count
        FROM expenses e
        LEFT JOIN categories c ON e.category_id = c.category_id
        WHERE e.user_id = ?
        GROUP BY e.category_id
        ORDER BY total DESC
        `
      )
      .all(user_id);

    const trends = db
      .prepare(
        `
        SELECT
          strftime('%Y-%m', date) AS month,
          SUM(amount) AS total,
          COUNT(*) AS count
        FROM expenses
        WHERE user_id = ?
        GROUP BY strftime('%Y-%m', date)
        ORDER BY month DESC
        LIMIT 12
        `
      )
      .all(user_id);

    const recentExpenses = db
      .prepare(
        `
        SELECT expense_id, amount, date, description, category_id
        FROM expenses
        WHERE user_id = ?
        ORDER BY date DESC, expense_id DESC
        LIMIT 10
        `
      )
      .all(user_id);

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      data: {
        totals,
        by_category: byCategory,
        trends,
        recent_expenses: recentExpenses,
      },
    });
  } catch (err) {
    console.error("GET /dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
