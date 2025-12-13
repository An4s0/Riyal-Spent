const express = require("express");

const openDb = require("../../utils/db");
const { getUserFromToken } = require("../../utils/auth");

const router = express.Router();

router.put("/", async (req, res) => {
  try {
    const { user_id } = getUserFromToken(req);
    const { full_name, email, preferred_currency } = req.body;
    const errors = {};

    if (full_name !== undefined && full_name.length < 3)
      errors.full_name = "Full name must be at least 3 characters";

    if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Invalid email format";

    if (preferred_currency !== undefined && preferred_currency.length < 2)
      errors.preferred_currency = "Invalid currency";

    if (Object.keys(errors).length)
      return res.status(400).json({ message: "Validation error", errors });

    const db = openDb();

    const user = db
      .prepare(
        `
        SELECT full_name, email, preferred_currency
        FROM users
        WHERE user_id = ?
        `
      )
      .get(user_id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (email && email !== user.email) {
      const exists = db
        .prepare("SELECT user_id FROM users WHERE email = ?")
        .get(email);

      if (exists)
        return res.status(400).json({ message: "Email already in use" });
    }

    const newName = full_name ?? user.full_name;
    const newEmail = email ?? user.email;
    const newCurrency = preferred_currency ?? user.preferred_currency ?? "SAR";
    const now = new Date().toISOString();

    db.prepare(
      `
      UPDATE users
      SET full_name = ?, email = ?, preferred_currency = ?, last_activity = ?
      WHERE user_id = ?
      `
    ).run(newName, newEmail, newCurrency, now, user_id);

    res.status(200).json({
      message: "Profile updated successfully",
      data: {
        user_id,
        full_name: newName,
        email: newEmail,
        preferred_currency: newCurrency,
        last_activity: now,
      },
    });
  } catch (err) {
    console.error("PUT /profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
