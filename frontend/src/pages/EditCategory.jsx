export default function EditCategory() {
  const icons = [
    "Food",
    "Transport",
    "Entertainment",
    "Shopping",
    "Home",
    "Education",
    "Health",
    "Work",
  ];

  const colors = [
    "orange",
    "blue",
    "purple",
    "green",
    "red",
    "yellow",
    "pink",
    "indigo",
  ];

  return (
    <div className="edit-category-page">
      {/* Header */}
      <div className="edit-category-header">
        <div>
          <h1>Edit Category</h1>
          <p>Update category details or delete permanently</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="edit-category-card">
        {/* Top Info */}
        <div className="category-top">
          <div className="category-info">
            <div className="category-icon">🍴</div>
            <div>
              <h2>Food Category</h2>
              <span>Created on Nov 10, 2024</span>
            </div>
          </div>

          <div className="category-total">
            <span>Total Expenses</span>
            <strong>850 SAR</strong>
          </div>
        </div>

        {/* Category Name */}
        <div className="form-group">
          <label>Category Name</label>
          <input type="text" defaultValue="Food" />
        </div>

        {/* Category Icon */}
        <div className="form-group">
          <label>Category Icon</label>
          <div className="icon-picker">
            {icons.map((icon, index) => (
              <button key={index} className="icon-option">
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Category Color */}
        <div className="form-group">
          <label>Category Color</label>
          <div className="color-picker">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`color-option ${color}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions split">
          <button className="btn-danger">Delete Category</button>

          <div>
            <button className="btn-cancel">Cancel</button>
            <button className="btn-primary">
              Update Category
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="category-stats">
        <div className="stat-card">
          <strong>23</strong>
          <span>Total Transactions</span>
        </div>
        <div className="stat-card">
          <strong>850 SAR</strong>
          <span>Total Amount</span>
        </div>
        <div className="stat-card">
          <strong>37 SAR</strong>
          <span>Average per Transaction</span>
        </div>
      </div>
    </div>
  );
}