import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Boxes,
  User,
  Save,
  Trash2,
  X,
} from "lucide-react";

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

const EditExpense = ({
  expenses = [],
  categories = [],
  updateExpense,
  deleteExpense,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const expenseId = Number(id);

  const existing = expenses.find((e) => e.id === expenseId);

  const [form, setForm] = useState({
    amount: "",
    categoryId: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    if (!existing) return;
    setForm({
      amount: existing.amount,
      categoryId: existing.categoryId,
      date: existing.date,
      description: existing.description || "",
    });
  }, [existing]);

  if (!existing) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Expense not found</h2>
        <Link to="/expenses">Back to Expenses</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    updateExpense({
      id: expenseId,
      amount: Number(form.amount),
      categoryId: Number(form.categoryId),
      date: form.date,
      description: form.description,
    });

    navigate("/expenses");
  };

  const handleDelete = () => {
    if (!window.confirm("Delete this expense?")) return;
    deleteExpense(expenseId);
    navigate("/expenses");
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header className="add-expense-header">
          <div>
            <h2>Edit Expense</h2>
            <p className="header-subtitle">Update expense details</p>
          </div>
          <Link to="/expenses" className="back-to-expenses-btn">
            ← Back
          </Link>
        </header>

        <div className="form-container">
          <form className="expense-form" onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Amount*</label>
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
              <button
                type="button"
                className="cancel-btn"
                onClick={handleDelete}
                style={{ color: "#ef4444" }}
              >
                <Trash2 size={18} /> Delete
              </button>

              <div>
                <Link to="/expenses" className="cancel-btn">
                  <X size={18} /> Cancel
                </Link>
                <button type="submit" className="save-btn">
                  <Save size={18} /> Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditExpense;
