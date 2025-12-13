export default function Categories() {
  const categories = [
    {
      name: "Food",
      description: "Restaurants, groceries, snacks",
      transactions: 47,
    },
    {
      name: "Transport",
      description: "Uber, bus, taxi, fuel",
      transactions: 23,
    },
    {
      name: "Entertainment",
      description: "Movies, games, events",
      transactions: 18,
    },
    {
      name: "Shopping",
      description: "Clothes, electronics, books",
      transactions: 15,
    },
    {
      name: "Healthcare",
      description: "Doctor, pharmacy, insurance",
      transactions: 8,
    },
    {
      name: "Education",
      description: "Books, courses, supplies",
      transactions: 12,
    },
    {
      name: "Bills",
      description: "Utilities, phone, internet",
      transactions: 6,
    },
    {
      name: "Others",
      description: "Miscellaneous expenses",
      transactions: 3,
    },
  ];

  return (
    <div className="categories-page">
      {/* Header */}
      <div className="categories-header">
        <div>
          <h1>Categories</h1>
          <p>
            Manage your expense categories and customize your spending
            organization
          </p>
        </div>

        <button className="add-category-btn">+ Add Category</button>
      </div>

      {/* Summary Cards */}
      <div className="categories-summary">
        <div className="summary-card">
          <span>Total Categories</span>
          <strong>8</strong>
        </div>

        <div className="summary-card">
          <span>Most Used</span>
          <strong>Food</strong>
        </div>

        <div className="summary-card">
          <span>This Month</span>
          <strong>6</strong>
        </div>
      </div>

      {/* All Categories */}
      <div className="categories-section">
        <div className="categories-section-header">
          <h2>All Categories</h2>

          <div className="categories-filters">
            <input type="text" placeholder="Search categories..." />
            <select>
              <option>All Status</option>
            </select>
          </div>
        </div>

        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div className="category-card" key={index}>
              <div className="category-card-header">
                <div className="category-icon">■</div>
                <div className="category-actions">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>

              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
              <span>{cat.transactions} transactions</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}