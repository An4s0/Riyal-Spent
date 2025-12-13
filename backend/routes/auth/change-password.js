const express = require("express");
const bcrypt = require("bcrypt");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    const errors = {};

    const { user_id } = getUserFromToken(req);

    if (!current_password)
      errors.current_password = "Current password is required";

    if (
      !new_password ||
      new_password.length < 8 ||
      !/[0-9]/.test(new_password) ||
      !/[A-Z]/.test(new_password) ||
      !/[a-z]/.test(new_password) ||
      !/[\W_]/.test(new_password)
    ) {
      errors.new_password =
        "New password must be at least 8 chars, include uppercase, lowercase, number, special char";
    }

    if (Object.keys(errors).length)
      return res.status(400).json({ message: "Validation error", errors });

    const db = openDb();

    const user = db
      .prepare("SELECT password_hash FROM users WHERE user_id = ?")
      .get(user_id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const validPass = await bcrypt.compare(
      current_password,
      user.password_hash
    );

    if (!validPass)
      return res.status(400).json({ message: "Current password is incorrect" });

    const new_hash = await bcrypt.hash(new_password, 10);
    const now = new Date().toISOString();

    db.prepare(
      `
      UPDATE users
      SET password_hash = ?, last_activity = ?
      WHERE user_id = ?
      `
    ).run(new_hash, now, user_id);

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error("POST /auth/change-password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
