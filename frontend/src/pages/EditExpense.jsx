export default function EditExpense() {
  return (
    <div className="edit-expense-page">
      {/* Header */}
      <div className="edit-expense-header">
        <div className="header-left">
          <button className="back-btn">←</button>
          <div>
            <h1>Edit Expense</h1>
            <p>Update your expense details</p>
          </div>
        </div>

        <span className="created-date">
          Created on Nov 24, 2024
        </span>
      </div>

      {/* Form Card */}
      <div className="edit-expense-card">
        <h2>Expense Details</h2>

        {/* Amount */}
        <div className="form-group">
          <label>
            Amount <span>*</span>
          </label>
          <input type="number" defaultValue="45" />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>
            Category <span>*</span>
          </label>
          <select defaultValue="">
            <option value="">Select a category</option>
            <option>Food</option>
            <option>Transport</option>
            <option>Entertainment</option>
            <option>Shopping</option>
            <option>Others</option>
          </select>
        </div>

        {/* Date */}
        <div className="form-group">
          <label>
            Date <span>*</span>
          </label>
          <input type="date" defaultValue="2024-11-24" />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea defaultValue="Lunch at restaurant" />
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button className="delete-btn">Delete Expense</button>
          <div>
            <button className="cancel-btn">Cancel</button>
            <button className="update-btn">Update Expense</button>
          </div>
        </div>
      </div>
    </div>
  );
}