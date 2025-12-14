import React, { useState } from "react";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Boxes,
  User,
  ArrowLeft,
  Utensils,
  Car,
  ShoppingCart,
  Home,
  GraduationCap,
  Heart,
  Briefcase,
  BookOpen,
  DollarSign,
  Gift,
  Zap,
  Check,
  Trash2,
} from "lucide-react";
import "./EditCategory.css";

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

/* ---------------- Data ---------------- */

const icons = [
  { name: "Utensils", icon: Utensils },
  { name: "Car", icon: Car },
  { name: "ShoppingCart", icon: ShoppingCart },
  { name: "Home", icon: Home },
  { name: "Briefcase", icon: Briefcase },
  { name: "BookOpen", icon: BookOpen },
  { name: "DollarSign", icon: DollarSign },
  { name: "Gift", icon: Gift },
  { name: "Zap", icon: Zap },
  { name: "Heart", icon: Heart },
  { name: "GraduationCap", icon: GraduationCap },
];

const colors = [
  "#ff7d7d",
  "#4a90e2",
  "#6f42c1",
  "#28a745",
  "#dc3545",
  "#ffc107",
  "#D47731",
  "#31C6D4",
];

/* ---------------- Page ---------------- */

const EditCategory = ({ categories = [], updateCategory, deleteCategory }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const categoryId = Number(id);

  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Category not found</h2>
        <Link to="/categories">Back</Link>
      </div>
    );
  }

  const initialIcon =
    icons.find((i) => i.icon === category.icon) || icons[0];

  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description || "");
  const [icon, setIcon] = useState(initialIcon);
  const [color, setColor] = useState(category.color);

  const Icon = icon.icon;
  const valid = name.trim().length > 0;

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!valid) return;

    updateCategory({
      id: categoryId,
      name: name.trim(),
      description,
      color,
      icon: icon.icon,
      iconBg: color + "1A",
    });

    navigate("/categories");
  };

  const handleDelete = () => {
    if (!window.confirm("Delete this category?")) return;
    deleteCategory(categoryId);
    navigate("/categories");
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header className="category-form-header">
          <Link to="/categories" className="back-link">
            <ArrowLeft size={24} /> Back
          </Link>
          <div>
            <h2>Edit Category</h2>
          </div>
        </header>

        <div className="category-form-panel">
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Name*</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Icon</label>
              <div className="icon-selector-grid">
                {icons.map((i) => {
                  const I = i.icon;
                  return (
                    <button
                      key={i.name}
                      type="button"
                      className={`icon-option ${
                        icon.name === i.name ? "selected" : ""
                      }`}
                      onClick={() => setIcon(i)}
                    >
                      <I size={22} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group">
              <label>Color</label>
              <div className="color-selector-grid">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`color-option ${
                      color === c ? "selected" : ""
                    }`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  >
                    {color === c && <Check size={14} color="#fff" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Preview</label>
              <div className="category-preview-box">
                <div
                  className="preview-icon-bg"
                  style={{ backgroundColor: color + "1A" }}
                >
                  <Icon size={20} color={color} />
                </div>
                <span className="preview-name" style={{ color }}>
                  {name}
                </span>
              </div>
            </div>

            <div className="form-actions-edit">
              <button
                type="button"
                className="btn-delete"
                onClick={handleDelete}
              >
                <Trash2 size={18} /> Delete
              </button>

              <Link to="/categories" className="btn-cancel">
                Cancel
              </Link>

              <button
                type="submit"
                className="btn-primary-category"
                disabled={!valid}
              >
                <Check size={18} /> Update
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditCategory;
