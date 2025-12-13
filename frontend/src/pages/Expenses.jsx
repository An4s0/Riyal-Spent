import { Link } from "react-router-dom";
import "../styles/expenses.css";

export default function Expenses() {
  const expenses = [
    {
      id: 1,
      date: "Nov 24, 2024",
      category: "Food",
      description: "Lunch at restaurant",
      amount: "45 SAR",
    },
    {
      id: 2,
      date: "Nov 23, 2024",
      category: "Transport",
      description: "Uber ride to mall",
      amount: "25 SAR",
    },
    {
      id: 3,
      date: "Nov 22, 2024",
      category: "Entertainment",
      description: "Movie tickets",
      amount: "60 SAR",
    },
    {
      id: 4,
      date: "Nov 21, 2024",
      category: "Shopping",
      description: "Grocery shopping",
      amount: "120 SAR",
    },
    {
      id: 5,
      date: "Nov 20, 2024",
      category: "Food",
      description: "Coffee and snacks",
      amount: "18 SAR",
    },
    {
      id: 6,
      date: "Nov 19, 2024",
      category: "Transport",
      description: "Gas station",
      amount: "95 SAR",
    },
    {
      id: 7,
      date: "Nov 18, 2024",
      category: "Food",
      description: "Dinner with friends",
      amount: "160 SAR",
    },
    {
      id: 8,
      date: "Nov 17, 2024",
      category: "Food",
      description: "Breakfast",
      amount: "45 SAR",
    },
    {
      id: 9,
      date: "Nov 16, 2024",
      category: "Others",
      description: "Pharmacy items",
      amount: "85 SAR",
    },
    {
      id: 10,
      date: "Nov 15, 2024",
      category: "Shopping",
      description: "Clothes shopping",
      amount: "200 SAR",
    },
  ];

  const handleDelete = (id) => {
    alert(`Delete expense with id: ${id}`);
  };

  return (
    <div className="expenses-page">
      {/* Header */}
      <div className="expenses-header">
        <div>
          <h1>Expenses</h1>
          <p>Manage and track all your expenses</p>
        </div>

        <Link to="/expenses/add" className="add-expense-btn">
          + Add Expense
        </Link>
      </div>

      {/* Summary */}
      <div className="expenses-summary">
        <div className="summary-card">
          <span>Total</span>
          <strong>2,450 SAR</strong>
        </div>
        <div className="summary-card">
          <span>This Month</span>
          <strong>1,268 SAR</strong>
        </div>
        <div className="summary-card">
          <span>This Week</span>
          <strong>268 SAR</strong>
        </div>
        <div className="summary-card">
          <span>Transactions</span>
          <strong>47</strong>
        </div>
      </div>

      {/* Filters */}
      <div className="expenses-filters">
        <input type="text" placeholder="Search expenses..." />
        <select>
          <option>All Categories</option>
        </select>
        <input type="date" />
        <button type="button">More Filters</button>
        <button type="button">Export</button>
        <select>
          <option>Sort by Date</option>
        </select>
      </div>

      {/* Table */}
      <table className="expenses-table">
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((item) => (
            <tr key={item.id}>
              <td>
                <input type="checkbox" />
              </td>

              <td>{item.date}</td>

              <td>
                <span
                  className={`category-badge ${item.category.toLowerCase()}`}
                >
                  {item.category}
                </span>
              </td>

              <td>{item.description}</td>
              <td>{item.amount}</td>

              <td className="actions">
                <Link
                  to={`/expenses/edit/${item.id}`}
                  className="action-btn"
                  title="Edit"
                >
                  ✏️
                </Link>

                <button
                  type="button"
                  className="action-btn"
                  title="Delete"
                  onClick={() => handleDelete(item.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="expenses-pagination">
        <span>Showing 1–10 of 47 expenses</span>
        <div>
          <button>{"<"}</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>{">"}</button>
        </div>
      </div>
    </div>
  );
}