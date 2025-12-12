const express = require("express");
const router = express.Router();
const { openDb, getUserIdFromRequest } = require("../Database-connection-assistant");

router.get("/expenses/:id", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const expense_id = req.params.id;
    const db = openDb();

    const expense = db
      .prepare(
        `SELECT expense_id, user_id, category_id, amount, date, description,
                created_at, last_modified
         FROM expenses
         WHERE expense_id = ? AND user_id = ?`
      )
      .get(expense_id, user_id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({
      message: "Expense fetched successfully",
      data: expense,
    });
  } catch (err) {
    console.error("GET /expenses/:id error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

