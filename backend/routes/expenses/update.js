const express = require("express");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const expense_id = req.params.id;
    const { amount, category_id, date, description } = req.body;

    const db = openDb();

    const current = db
      .prepare(
        `
        SELECT amount, category_id, date, description
        FROM expenses
        WHERE expense_id = ? AND user_id = ?
        `
      )
      .get(expense_id, user_id);

    if (!current) return res.status(404).json({ message: "Expense not found" });

    const now = new Date().toISOString();

    db.prepare(
      `
      UPDATE expenses
      SET amount = ?, category_id = ?, date = ?, description = ?, last_modified = ?
      WHERE expense_id = ? AND user_id = ?
      `
    ).run(
      amount ?? current.amount,
      category_id ?? current.category_id,
      date ?? current.date,
      description ?? current.description,
      now,
      expense_id,
      user_id
    );

    const updated = db
      .prepare(
        `
        SELECT expense_id, user_id, category_id, amount, date, description,
               created_at, last_modified
        FROM expenses
        WHERE expense_id = ? AND user_id = ?
        `
      )
      .get(expense_id, user_id);

    res.status(200).json({
      message: "Expense updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("PUT /expenses/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
