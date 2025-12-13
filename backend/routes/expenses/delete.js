const express = require("express");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const expense_id = req.params.id;
    const db = openDb();

    const exists = db
      .prepare(
        "SELECT expense_id FROM expenses WHERE expense_id = ? AND user_id = ?"
      )
      .get(expense_id, user_id);

    if (!exists) return res.status(404).json({ message: "Expense not found" });

    db.prepare("DELETE FROM expenses WHERE expense_id = ? AND user_id = ?").run(
      expense_id,
      user_id
    );

    res.status(200).json({
      message: "Expense deleted successfully",
      expense_id,
    });
  } catch (err) {
    console.error("DELETE /expenses/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
