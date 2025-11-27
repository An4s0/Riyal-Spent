const express = require("express");
const router = express.Router();
const { DatabaseSync } = require("node:sqlite");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    const errors = {};

    if (!full_name || full_name.length < 3)
      errors.full_name = "Full name must be at least 3 characters";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Invalid email format";
    if (
      !password ||
      password.length < 8 ||
      !/[0-9]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[\W_]/.test(password)
    )
      errors.password =
        "Password must be at least 8 chars, include uppercase, lowercase, number, special char";

    if (Object.keys(errors).length)
      return res.status(400).json({ message: "Validation error", errors });

    const db = new DatabaseSync(path.join(__dirname, "../../riyal-spent.db"));

    if (db.prepare("SELECT user_id FROM users WHERE email = ?").get(email))
      return res.status(400).json({ message: "Email already exists" });

    const password_hash = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();
    const result = db
      .prepare(
        `
      INSERT INTO users (full_name, email, password_hash, member_since, last_activity)
      VALUES (?, ?, ?, ?, ?)
    `
      )
      .run(full_name, email, password_hash, now.split("T")[0], now);

    const user_id = result.lastInsertRowid;

    const token = jwt.sign({ user_id, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User signed up successfully",
      data: {
        token,
        user_id,
        full_name,
        email,
        member_since: now.split("T")[0],
        preferred_currency: "SAR",
        last_activity: now,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
