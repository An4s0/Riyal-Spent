// Purpose: Delete expense

const express = require("express");
const router = express.Router();
const { openDb, getUserIdFromRequest } = require("../Database-connection-assistant");

router.delete("/expenses/:id", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const expense_id = req.params.id;
    const db = openDb();

    const existing = db
      .prepare(
        "SELECT expense_id FROM expenses WHERE expense_id = ? AND user_id = ?"
      )
      .get(expense_id, user_id);

    if (!existing) {
      return res.status(404).json({ message: "Expense not found" });
    }

    db.prepare(
      "DELETE FROM expenses WHERE expense_id = ? AND user_id = ?"
    ).run(expense_id, user_id);

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
