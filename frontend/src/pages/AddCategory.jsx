import { useNavigate } from "react-router-dom";
import "../styles/expenses.css";

export default function AddCategory() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Category added successfully");
    navigate("/categories");
  };

  return (
    <div className="expenses-page">
      {/* Header */}
      <div className="expenses-header">
        <div>
          <h1>Add New Category</h1>
          <p>Create a new category for your expenses</p>
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
      <form className="summary-card" onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label>Category Name *</label>
          <input
            type="text"
            placeholder="e.g. Food, Transport"
            required
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Color *</label>
          <select required>
            <option value="">Select color</option>
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
            placeholder="Optional description"
          />
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/categories")}
          >
            Cancel
          </button>

          <button type="submit" className="add-expense-btn">
            💾 Save Category
          </button>
        </div>
      </form>
    </div>
  );
}