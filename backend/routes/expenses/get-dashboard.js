const express = require("express");
const router = express.Router();
const { openDb, getUserIdFromRequest } = require("../Database-connection-assistant");

router.get("/dashboard", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const db = openDb();
    const { period = "month" } = req.query; 

    const totalStats = db
      .prepare(
        `SELECT 
          SUM(amount) as total_amount,
          COUNT(*) as total_count,
          AVG(amount) as average_amount,
          MIN(date) as first_expense,
          MAX(date) as last_expense
         FROM expenses 
         WHERE user_id = ?`
      )
      .get(user_id);

    const byCategory = db
      .prepare(
        `SELECT 
          c.category_id,
          c.name as category_name,
          SUM(e.amount) as total,
          COUNT(e.expense_id) as count
         FROM expenses e
         LEFT JOIN categories c ON e.category_id = c.category_id
         WHERE e.user_id = ?
         GROUP BY e.category_id
         ORDER BY total DESC`
      )
      .all(user_id);

    const monthlyTrends = db
      .prepare(
        `SELECT 
          strftime('%Y-%m', date) as month,
          SUM(amount) as total,
          COUNT(*) as count
         FROM expenses 
         WHERE user_id = ?
         GROUP BY strftime('%Y-%m', date)
         ORDER BY month DESC
         LIMIT 12`
      )
      .all(user_id);

    const recentExpenses = db
      .prepare(
        `SELECT expense_id, amount, date, description, category_id
         FROM expenses 
         WHERE user_id = ?
         ORDER BY date DESC, expense_id DESC
         LIMIT 10`
      )
      .all(user_id);

    return res.status(200).json({
      message: "Dashboard data fetched successfully",
      data: {
        totals: totalStats,
        by_category: byCategory,
        trends: monthlyTrends,
        recent_expenses: recentExpenses
      },
    });
  } catch (err) {
    console.error("GET /dashboard error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
