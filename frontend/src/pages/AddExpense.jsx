import { useNavigate } from "react-router-dom";
import "../styles/expenses.css";

export default function AddExpense() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Expense added successfully");
    navigate("/expenses");
  };

  return (
    <div className="expenses-page">
      {/* Header */}
      <div className="expenses-header">
        <div>
          <h1>Add New Expense</h1>
          <p>Create a new expense record</p>
        </div>

        <button
          type="button"
          className="add-expense-btn"
          onClick={() => navigate("/expenses")}
        >
          ← Back
        </button>
      </div>

      {/* Form */}
      <form className="summary-card" onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label>Amount *</label>
          <input
            type="number"
            placeholder="SAR 0.00"
            required
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Category *</label>
          <select required>
            <option value="">Select category</option>
            <option>Food</option>
            <option>Transport</option>
            <option>Entertainment</option>
            <option>Shopping</option>
            <option>Others</option>
          </select>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Date *</label>
          <input type="date" required />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label>Description</label>
          <textarea
            rows="3"
            placeholder="Enter description (optional)"
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
            onClick={() => navigate("/expenses")}
          >
            Cancel
          </button>

          <button type="submit" className="add-expense-btn">
            💾 Save Expense
          </button>
        </div>
      </form>
    </div>
  );
}