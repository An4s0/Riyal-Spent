import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Boxes,
  User,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import "./Catgories.css";

/* ---------------- Sidebar ---------------- */

const sidebarItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Expenses", path: "/expenses", icon: Wallet },
  { name: "Categories", path: "/categories", icon: Boxes },
  { name: "Profile", path: "/profile", icon: User },
];

const Sidebar = () => (
  <div className="sidebar">
    <h2 className="sidebar-logo">Riyal Spent</h2>
    <nav className="sidebar-nav">
      {sidebarItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            item.name === "Categories" ? "nav-item active" : "nav-item"
          }
        >
          <item.icon size={18} />
          <span>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  </div>
);

/* ---------------- Card ---------------- */

const CategoryCard = ({ category }) => {
  const Icon = category.icon || Boxes;

  return (
    <div className="category-card">
      <div className="card-actions">
        <Link
          to={`/categories/edit/${category.id}`}
          className="action-btn edit-btn"
        >
          <Pencil size={16} />
        </Link>
        <Link
          to={`/categories/edit/${category.id}`}
          className="action-btn delete-btn"
        >
          <Trash2 size={16} />
        </Link>
      </div>

      <div
        className="card-icon-wrapper"
        style={{ backgroundColor: category.iconBg }}
      >
        <Icon size={24} color={category.color} />
      </div>

      <h3 className="card-title" style={{ color: category.color }}>
        {category.name}
      </h3>
      <p className="card-description">{category.description}</p>
      <p className="card-transactions">
        {category.transactions || 0} transactions
      </p>
    </div>
  );
};

/* ---------------- Page ---------------- */

const Categories = ({ categories = [] }) => {
  const [search, setSearch] = useState("");

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header className="page-header">
          <div>
            <h1>Categories</h1>
            <p className="header-subtitle">
              Manage your expense categories
            </p>
          </div>

          <Link to="/categories/add" className="btn-add-category">
            <Plus size={18} /> Add Category
          </Link>
        </header>

        <div className="search-controls">
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="categories-grid">
          {filtered.length === 0 && (
            <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              No categories found
            </p>
          )}

          {filtered.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Categories;
