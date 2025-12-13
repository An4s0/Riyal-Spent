import { useParams, useNavigate } from "react-router-dom";
import "../styles/expenses.css";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  // بيانات وهمية (لاحقاً من API)
  const category = {
    name: "Food",
    color: "food",
    description: "Daily food expenses",
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    alert(`Category ${id} updated`);
    navigate("/categories");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this category?")) {
      alert(`Category ${id} deleted`);
      navigate("/categories");
    }
  };

  return (
    <div className="expenses-page">
      {/* Header */}
      <div className="expenses-header">
        <div>
          <h1>Edit Category</h1>
          <p>Update your category details</p>
        </div>

        <button
          type="button"
          className="add-expense-btn"
          onClick={() => navigate("/categories")}
        >
          ← Back
        </button>
      </div>

      {/* Form */}
      <form className="summary-card" onSubmit={handleUpdate}>
        <div style={{ marginBottom: "16px" }}>
          <label>Category Name *</label>
          <input
            type="text"
            defaultValue={category.name}
            required
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Color *</label>
          <select defaultValue={category.color} required>
            <option value="food">Orange (Food)</option>
            <option value="transport">Blue (Transport)</option>
            <option value="entertainment">Purple (Entertainment)</option>
            <option value="shopping">Green (Shopping)</option>
            <option value="others">Gray (Others)</option>
          </select>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label>Description</label>
          <textarea
            rows="3"
            defaultValue={category.description}
          />
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            className="action-btn"
            style={{ color: "#ef4444" }}
            onClick={handleDelete}
          >
            🗑️ Delete Category
          </button>

          <div>
            <button
              type="button"
              onClick={() => navigate("/categories")}
              style={{ marginRight: "12px" }}
            >
              Cancel
            </button>

            <button type="submit" className="add-expense-btn">
              💾 Update Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}