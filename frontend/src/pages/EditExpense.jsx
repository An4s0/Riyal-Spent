import { useParams, useNavigate } from "react-router-dom";
import "../styles/expenses.css";

export default function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  // بيانات وهمية (لاحقاً تجي من API)
  const expense = {
    amount: "45",
    category: "Food",
    date: "2024-11-24",
    description: "Lunch at restaurant",
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    alert(`Expense ${id} updated`);
    navigate("/expenses");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this expense?")) {
      alert(`Expense ${id} deleted`);
      navigate("/expenses");
    }
  };

  return (
    <div className="expenses-page">
      {/* Header */}
      <div className="expenses-header">
        <div>
          <h1>Edit Expense</h1>
          <p>Update your expense details</p>
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
      <form className="summary-card" onSubmit={handleUpdate}>
        <div style={{ marginBottom: "16px" }}>
          <label>Amount *</label>
          <input
            type="number"
            defaultValue={expense.amount}
            required
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Category *</label>
          <select defaultValue={expense.category} required>
            <option>Food</option>
            <option>Transport</option>
            <option>Entertainment</option>
            <option>Shopping</option>
            <option>Others</option>
          </select>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Date *</label>
          <input
            type="date"
            defaultValue={expense.date}
            required
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label>Description</label>
          <textarea
            rows="3"
            defaultValue={expense.description}
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
            onClick={handleDelete}
            style={{ color: "#ef4444" }}
          >
            🗑️ Delete Expense
          </button>

          <div>
            <button
              type="button"
              onClick={() => navigate("/expenses")}
              style={{ marginRight: "12px" }}
            >
              Cancel
            </button>

            <button type="submit" className="add-expense-btn">
              💾 Update Expense
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}