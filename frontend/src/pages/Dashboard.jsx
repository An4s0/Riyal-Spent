import React, { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from "recharts";
import './dashboard.css';
import {
  Plus, Wallet, Boxes, User, LayoutDashboard,
  Tag, TrendingUp, Calendar, Search, Edit, Trash2
} from "lucide-react";

/* ---------- Sidebar ---------- */

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

/* ---------- Dashboard ---------- */

const Dashboard = ({ expenses = [], categories = [] }) => {

  /* ===== Summary ===== */
  const totalExpenses = useMemo(
    () => expenses.reduce((s, e) => s + Number(e.amount || 0), 0),
    [expenses]
  );

  const totalTransactions = expenses.length;

  /* ===== Pie Chart (by category) ===== */
  const pieChartData = useMemo(() => {
    return categories
      .map((cat) => {
        const value = expenses
          .filter((e) => e.categoryId === cat.id)
          .reduce((s, e) => s + Number(e.amount), 0);

        return {
          name: cat.name,
          value,
          color: cat.color,
        };
      })
      .filter((c) => c.value > 0);
  }, [expenses, categories]);

  /* ===== Line Chart (by date) ===== */
  const lineChartData = useMemo(() => {
    const map = {};
    expenses.forEach((e) => {
      map[e.date] = (map[e.date] || 0) + Number(e.amount);
    });
    return Object.entries(map).map(([date, amount]) => ({
      name: date,
      amount,
    }));
  }, [expenses]);

  /* ===== Recent Transactions ===== */
  const recentTransactions = useMemo(
    () => expenses.slice(-5).reverse(),
    [expenses]
  );

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h2>Dashboard</h2>
            <p className="header-subtitle">
              Track your expenses and manage your budget
            </p>
          </div>
          <Link to="/expenses/add" className="add-expense-btn">
            <Plus size={20} /> Add Expense
          </Link>
        </header>

        {/* ===== Summary Cards ===== */}
        <div className="summary-cards-grid">
          <div className="summary-card">
            <div className="card-info">
              <p className="card-title">Total Expenses</p>
              <h3 className="card-value">{totalExpenses.toFixed(2)} SAR</h3>
            </div>
            <div className="card-icon-container red-bg">
              <Wallet size={24} color="#fff" />
            </div>
          </div>

          <div className="summary-card">
            <div className="card-info">
              <p className="card-title">Transactions</p>
              <h3 className="card-value">{totalTransactions}</h3>
            </div>
            <div className="card-icon-container blue-bg">
              <TrendingUp size={24} color="#fff" />
            </div>
          </div>
        </div>

        {/* ===== Charts ===== */}
        <div className="charts-grid">
          <div className="chart-panel">
            <h3 className="chart-title">Expenses by Category</h3>

            {pieChartData.length === 0 ? (
              <p>No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieChartData} dataKey="value" nameKey="name">
                    {pieChartData.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="chart-panel">
            <h3 className="chart-title">Spending Trend</h3>

            {lineChartData.length === 0 ? (
              <p>No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="amount" stroke="#4a90e2" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* ===== Recent Transactions ===== */}
        <div className="chart-panel">
          <h3 className="chart-title">Recent Transactions</h3>

          <table className="transactions-table">
            <tbody>
              {recentTransactions.length === 0 && (
                <tr>
                  <td>No expenses yet</td>
                </tr>
              )}

              {recentTransactions.map((e) => {
                const cat = categories.find((c) => c.id === e.categoryId);
                return (
                  <tr key={e.id}>
                    <td>{e.date}</td>
                    <td>
                      <span
                        className="category-tag"
                        style={{
                          backgroundColor: cat?.color + "20",
                          color: cat?.color,
                        }}
                      >
                        {cat?.name || "Unknown"}
                      </span>
                    </td>
                    <td>{e.description}</td>
                    <td className="amount-cell">
                      {Number(e.amount).toFixed(2)} SAR
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
