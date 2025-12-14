import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Boxes,
  User,
  Save,
  X,
} from "lucide-react";
import "./addexpense.css";

/* ---------------- Sidebar ---------------- */

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Expenses", path: "/expenses", icon: Wallet },
  { name: "Categories", path: "/categories", icon: Boxes },
  { name: "Profile", path: "/profile", icon: User },
];

const Sidebar = () => (
  <div className="sidebar">
    <h2 className="sidebar-logo">Riyal Spent</h2>
    <nav className="sidebar-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            item.name === "Expenses" ? "nav-item active" : "nav-item"
          }
        >
          <item.icon size={18} />
          <span>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  </div>
);

/* ---------------- Page ---------------- */

const AddExpense = ({ addExpense, categories = [] }) => {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    amount: "",
    categoryId: "",
    date: today,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount || !form.categoryId) return;

    addExpense({
      amount: Number(form.amount),
      categoryId: Number(form.categoryId),
      date: form.date,
      description: form.description,
    });

    navigate("/expenses");
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header className="add-expense-header">
          <div>
            <h2>Add New Expense</h2>
            <p className="header-subtitle">
              Create a new expense record
            </p>
          </div>
          <Link to="/expenses" className="back-to-expenses-btn">
            ← Back
          </Link>
        </header>

        <div className="form-container">
          <form className="expense-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Amount (SAR)*</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category*</label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Date*</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <Link to="/expenses" className="cancel-btn">
                <X size={18} /> Cancel
              </Link>
              <button type="submit" className="save-btn">
                <Save size={18} /> Save Expense
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddExpense;
