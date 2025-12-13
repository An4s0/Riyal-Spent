export default function AddExpense() {
  return (
    <div className="add-expense-page">
      {/* Header */}
      <div className="add-expense-header">
        <div>
          <h1>Add New Expense</h1>
          <p>Create a new expense record for your budget tracking</p>
        </div>

        <button className="back-btn">← Back to Expenses</button>
      </div>

      {/* Form Card */}
      <div className="add-expense-card">
        {/* Amount */}
        <div className="form-group">
          <label>
            Amount <span>*</span>
          </label>
          <input type="number" placeholder="SAR 0.00" />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>
            Category <span>*</span>
          </label>
          <select>
            <option>Select a category</option>
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
          <input type="date" />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Enter a description for this expense (optional)"
            maxLength={200}
          />
          <small>Maximum 200 characters</small>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save Expense</button>
        </div>
      </div>

      {/* Recent Categories */}
      <div className="recent-categories">
        <h3>Recent Categories</h3>
        <div className="category-tags">
          <span className="category food">Food</span>
          <span className="category transport">Transport</span>
          <span className="category entertainment">Entertainment</span>
          <span className="category shopping">Shopping</span>
        </div>
      </div>
    </div>
  );
}