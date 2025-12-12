const express = require("express");
const router = express.Router();
const { openDb, getUserIdFromRequest } = require("../Database-connection-assistant");

router.put("/expenses/:id", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const expense_id = req.params.id;
    const { amount, category_id, date, description } = req.body;

    const db = openDb();

    const current = db
      .prepare(
        `SELECT expense_id, user_id, category_id, amount, date, description,
                created_at, last_modified
         FROM expenses
         WHERE expense_id = ? AND user_id = ?`
      )
      .get(expense_id, user_id);

    if (!current) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const newAmount = amount ?? current.amount;
    const newCategoryId = category_id ?? current.category_id;
    const newDate = date ?? current.date;
    const newDesc = description ?? current.description;
    const now = new Date().toISOString();

    db.prepare(
      `UPDATE expenses
       SET amount = ?, category_id = ?, date = ?, description = ?, last_modified = ?
       WHERE expense_id = ? AND user_id = ?`
    ).run(
      newAmount,
      newCategoryId,
      newDate,
      newDesc,
      now,
      expense_id,
      user_id
    );

    const updated = db
      .prepare(
        `SELECT expense_id, user_id, category_id, amount, date, description,
                created_at, last_modified
         FROM expenses
         WHERE expense_id = ? AND user_id = ?`
      )
      .get(expense_id, user_id);

    return res.status(200).json({
      message: "Expense updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("PUT /expenses/:id error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

