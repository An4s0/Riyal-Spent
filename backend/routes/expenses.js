const express = require("express");
const router = express.Router();

const { DatabaseSync } = require("node:sqlite");
const path = require("path");
const jwt = require("jsonwebtoken");

function openDb() {
  return new DatabaseSync(path.join(__dirname, "../../riyal-spent.db"));
}

function getUserIdFromRequest(req, res) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid token" });
    return null;
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user_id;
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
    return null;
  }
}

// dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const db = openDb();

    const totalRow = db
      .prepare("SELECT COALESCE(SUM(amount), 0) AS total FROM expenses WHERE user_id = ?")
      .get(user_id);

    const countRow = db
      .prepare("SELECT COUNT(*) AS count FROM expenses WHERE user_id = ?")
      .get(user_id);

    const recentExpenses = db
      .prepare(
        "SELECT expense_id, title, amount, category_id, date, note FROM expenses WHERE user_id = ? ORDER BY date DESC, expense_id DESC LIMIT 5"
      )
      .all(user_id);

    
    const categoryBreakdown = db
      .prepare(
        `SELECT c.category_id, c.name AS category_name, COALESCE(SUM(e.amount), 0) AS total
         FROM categories c
         LEFT JOIN expenses e ON e.category_id = c.category_id AND e.user_id = ?
         WHERE c.user_id = ? OR c.user_id IS NULL
         GROUP BY c.category_id, c.name`
      )
      .all(user_id, user_id);

    return res.status(200).json({
      message: "Dashboard fetched successfully",
      data: {
        totalSpent: totalRow.total,
        expenseCount: countRow.count,

        thisMonth: 0,
        thisWeek: 0,
        categoryBreakdown,
        recentExpenses,
      },
    });
  } catch (err) {
    console.error("GET /dashboard error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// expenses
router.get("/expenses", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const db = openDb();

    const { category_id, search } = req.query;

    let sql =
      "SELECT expense_id, title, amount, category_id, date, note FROM expenses WHERE user_id = ?";
    const params = [user_id];

    if (category_id) {
      sql += " AND category_id = ?";
      params.push(category_id);
    }

    if (search) {
      sql += " AND title LIKE ?";
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

router.post("/expenses", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const { title, amount, category_id, date, note } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ message: "Title and amount are required" });
    }

    const db = openDb();

    const nowDate = date || new Date().toISOString().slice(0, 10);

    const info = db
      .prepare(
        "INSERT INTO expenses (user_id, title, amount, category_id, date, note) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .run(user_id, title, amount, category_id || null, nowDate, note || null);

    const expense = db
      .prepare(
        "SELECT expense_id, user_id, title, amount, category_id, date, note FROM expenses WHERE expense_id = ?"
      )
      .get(info.lastInsertRowid);

    return res.status(201).json({
      message: "Expense created successfully",
      data: expense,
    });
  } catch (err) {
    console.error("POST /expenses error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/expenses/:id", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const expense_id = req.params.id;

    const db = openDb();

    const expense = db
      .prepare(
        "SELECT expense_id, user_id, title, amount, category_id, date, note FROM expenses WHERE expense_id = ? AND user_id = ?"
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

// input expenses/:id
router.put("/expenses/:id", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const expense_id = req.params.id;
    const { title, amount, category_id, date, note } = req.body;

    const db = openDb();

    const current = db
      .prepare(
        "SELECT expense_id, title, amount, category_id, date, note FROM expenses WHERE expense_id = ? AND user_id = ?"
      )
      .get(expense_id, user_id);

    if (!current) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const newTitle = title ?? current.title;
    const newAmount = amount ?? current.amount;
    const newCategoryId = category_id ?? current.category_id;
    const newDate = date ?? current.date;
    const newNote = note ?? current.note;

    db.prepare(
      "UPDATE expenses SET title = ?, amount = ?, category_id = ?, date = ?, note = ? WHERE expense_id = ? AND user_id = ?"
    ).run(newTitle, newAmount, newCategoryId, newDate, newNote, expense_id, user_id);

    const updated = db
      .prepare(
        "SELECT expense_id, user_id, title, amount, category_id, date, note FROM expenses WHERE expense_id = ? AND user_id = ?"
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

// delete expenses/:id
router.delete("/expenses/:id", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const expense_id = req.params.id;

    const db = openDb();

    const existing = db
      .prepare("SELECT expense_id FROM expenses WHERE expense_id = ? AND user_id = ?")
      .get(expense_id, user_id);

    if (!existing) {
      return res.status(404).json({ message: "Expense not found" });
    }

    db.prepare("DELETE FROM expenses WHERE expense_id = ? AND user_id = ?")
      .run(expense_id, user_id);

    return res.status(200).json({
      message: "Expense deleted successfully",
      expense_id,
    });
  } catch (err) {
    console.error("DELETE /expenses/:id error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
