import React, { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Plus,
  Wallet,
  Boxes,
  User,
  LayoutDashboard,
  Tag,
  Trash2,
  Edit3,
} from "lucide-react";
import "./Expenses.css";

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
            isActive ? "nav-item active" : "nav-item"
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

const Expenses = ({ expenses = [], categories = [] }) => {
  const expensesWithCategory = useMemo(() => {
    return expenses.map((e) => {
      const cat = categories.find((c) => c.id === e.categoryId);
      return {
        ...e,
        categoryName: cat?.name || "Unknown",
        categoryColor: cat?.color || "#999",
      };
    });
  }, [expenses, categories]);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h2>Expenses</h2>
            <p className="header-subtitle">
              Manage and track all your expenses
            </p>
          </div>

          <Link to="/expenses/add" className="add-expense-btn">
            <Plus size={18} /> Add Expense
          </Link>
        </header>

        {/* Table */}
        <div className="table-panel">
          <div className="table-wrapper">
            <table className="expenses-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th className="text-right">Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expensesWithCategory.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No expenses yet
                    </td>
                  </tr>
                )}

                {expensesWithCategory.map((e) => (
                  <tr key={e.id}>
                    <td>{e.date}</td>
                    <td>
                      <span
                        className="category-tag"
                        style={{
                          backgroundColor: e.categoryColor + "20",
                          color: e.categoryColor,
                        }}
                      >
                        <Tag size={12} /> {e.categoryName}
                      </span>
                    </td>
                    <td>{e.description || "-"}</td>
                    <td className="amount-cell text-right">
                      {Number(e.amount).toFixed(2)} SAR
                    </td>
                    <td>
                      <Link
                        to={`/expenses/edit/${e.id}`}
                        className="action-btn edit-btn"
                      >
                        <Edit3 size={16} />
                      </Link>
                      <span style={{ width: 8, display: "inline-block" }} />
                      <Link
                        to={`/expenses/edit/${e.id}`}
                        className="action-btn delete-btn"
                      >
                        <Trash2 size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Expenses;
