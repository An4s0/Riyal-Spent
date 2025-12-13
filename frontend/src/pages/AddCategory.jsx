export default function AddCategory() {
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
    <div className="add-category-page">
      {/* Header */}
      <div className="add-category-header">
        <div>
          <h1>Add New Category</h1>
          <p>
            Create a new expense category to organize your spending
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="add-category-card">
        {/* Category Name */}
        <div className="form-group">
          <label>
            Category Name <span>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter category name (e.g., Food, Transport, Entertainment)"
          />
          <small>Choose a descriptive name for your category</small>
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

        {/* Preview */}
        <div className="form-group">
          <label>Preview:</label>
          <div className="category-preview">
            <span className="preview-dot"></span>
            <span>Category Name</span>
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button className="btn-cancel">Cancel</button>
          <button className="btn-primary">Save Category</button>
        </div>
      </div>
    </div>
  );
}