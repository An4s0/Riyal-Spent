import { Link } from "react-router-dom";
import "../styles/expenses.css";

export default function Categories() {
  const categories = [
    { id: 1, name: "Food", color: "food", count: 18 },
    { id: 2, name: "Transport", color: "transport", count: 9 },
    { id: 3, name: "Entertainment", color: "entertainment", count: 6 },
    { id: 4, name: "Shopping", color: "shopping", count: 11 },
    { id: 5, name: "Others", color: "others", count: 3 },
  ];

  const handleDelete = (id) => {
    if (confirm("Delete this category?")) {
      alert(`Category ${id} deleted`);
    }
  };

  return (
    <div className="expenses-page">
      {/* Header */}
      <div className="expenses-header">
        <div>
          <h1>Categories</h1>
          <p>Manage your expense categories</p>
        </div>

        <Link to="/categories/add" className="add-expense-btn">
          + Add Category
        </Link>
      </div>

      {/* Categories Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {categories.map((cat) => (
          <div key={cat.id} className="summary-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <span
                className={`category-badge ${cat.color}`}
                style={{ fontSize: "13px" }}
              >
                {cat.name}
              </span>

              <div>
                <Link
                  to={`/categories/edit/${cat.id}`}
                  className="action-btn"
                  title="Edit"
                  style={{ marginRight: "8px" }}
                >
                  ✏️
                </Link>

                <button
                  type="button"
                  className="action-btn"
                  title="Delete"
                  onClick={() => handleDelete(cat.id)}
                >
                  🗑️
                </button>
              </div>
            </div>

            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              {cat.count} expenses
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}