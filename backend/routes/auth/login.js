const express = require("express");
const router = express.Router();
const { DatabaseSync } = require("node:sqlite");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Invalid email format";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length)
      return res.status(400).json({ message: "Validation error", errors });

    const db = new DatabaseSync(path.join(__dirname, "../../riyal-spent.db"));

    const user = db
      .prepare(
        `SELECT user_id, full_name, email, password_hash, member_since, preferred_currency
         FROM users WHERE email = ?`
      )
      .get(email);

    if (!user)
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });

    const validPass = await bcrypt.compare(password, user.password_hash);

    if (!validPass)
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });

    const now = new Date().toISOString();
    db.prepare("UPDATE users SET last_activity = ? WHERE user_id = ?").run(
      now,
      user.user_id
    );

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        token,
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        member_since: user.member_since,
        preferred_currency: user.preferred_currency || "SAR",
        last_activity: now,
      },
    });
  } catch (err) {
    console.error("POST /auth/login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
