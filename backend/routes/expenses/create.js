const express = require("express");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const { amount, category_id, date, description } = req.body;

    if (!amount || !date)
      return res.status(400).json({ message: "Amount and date are required" });

    const db = openDb();
    const now = new Date().toISOString();

    const result = db
      .prepare(
        `
        INSERT INTO expenses
          (user_id, category_id, amount, date, description, created_at, last_modified)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `
      )
      .run(
        user_id,
        category_id ?? null,
        amount,
        date,
        description ?? null,
        now,
        now
      );

    const expense = db
      .prepare(
        `
        SELECT expense_id, user_id, category_id, amount, date, description,
               created_at, last_modified
        FROM expenses
        WHERE expense_id = ?
        `
      )
      .get(result.lastInsertRowid);

    res.status(201).json({
      message: "Expense created successfully",
      data: expense,
    });
  } catch (err) {
    console.error("POST /expenses error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
