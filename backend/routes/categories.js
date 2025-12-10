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

// get categories
router.get("/categories", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const db = openDb();

    const categories = db
      .prepare(
        `SELECT category_id, name, icon, color, user_id
         FROM categories
         WHERE user_id IS NULL OR user_id = ?
         ORDER BY name ASC`
      )
      .all(user_id);

    return res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (err) {
    console.error("GET /categories error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


router.post("/categories", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const { name, icon, color } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const db = openDb();

    const info = db
      .prepare(
        "INSERT INTO categories (name, icon, color, user_id) VALUES (?, ?, ?, ?)"
      )
      .run(name, icon || null, color || null, user_id);

    const category = db
      .prepare(
        "SELECT category_id, name, icon, color, user_id FROM categories WHERE category_id = ?"
      )
      .get(info.lastInsertRowid);

    return res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (err) {
    console.error("POST /categories error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


router.get("/categories/:id", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const category_id = req.params.id;

    const db = openDb();

    const category = db
      .prepare(
        `SELECT category_id, name, icon, color, user_id
         FROM categories
         WHERE category_id = ?
           AND (user_id IS NULL OR user_id = ?)`
      )
      .get(category_id, user_id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category fetched successfully",
      data: category,
    });
  } catch (err) {
    console.error("GET /categories/:id error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// input categories/:id
router.put("/categories/:id", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const category_id = req.params.id;
    const { name, icon, color } = req.body;

    const db = openDb();

    const current = db
      .prepare(
        "SELECT category_id, name, icon, color FROM categories WHERE category_id = ? AND user_id = ?"
      )
      .get(category_id, user_id);

    if (!current) {
      return res.status(404).json({ message: "Category not found or not editable" });
    }

    const newName = name ?? current.name;
    const newIcon = icon ?? current.icon;
    const newColor = color ?? current.color;

    db.prepare(
      "UPDATE categories SET name = ?, icon = ?, color = ? WHERE category_id = ? AND user_id = ?"
    ).run(newName, newIcon, newColor, category_id, user_id);

    const updated = db
      .prepare(
        "SELECT category_id, name, icon, color, user_id FROM categories WHERE category_id = ?"
      )
      .get(category_id);

    return res.status(200).json({
      message: "Category updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("PUT /categories/:id error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// delete categories
router.delete("/categories/:id", async (req, res) => {
  try {
    const user_id = getUserIdFromRequest(req, res);
    if (!user_id) return;

    const category_id = req.params.id;

    const db = openDb();

    const existing = db
      .prepare(
        "SELECT category_id FROM categories WHERE category_id = ? AND user_id = ?"
      )
      .get(category_id, user_id);

    if (!existing) {
      return res.status(404).json({ message: "Category not found or not deletable" });
    }

    db.prepare("DELETE FROM categories WHERE category_id = ? AND user_id = ?")
      .run(category_id, user_id);

    return res.status(200).json({
      message: "Category deleted successfully",
      category_id,
    });
  } catch (err) {
    console.error("DELETE /categories/:id error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
