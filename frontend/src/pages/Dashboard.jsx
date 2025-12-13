import "../styles/dashboard.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/logo.svg" alt="Riyal Spent" />
          <span>Riyal Spent</span>
        </div>

        <nav className="sidebar-nav">
          <a className="active">Dashboard</a>
          <a>Expenses</a>
          <a>Categories</a>
          <Link to="/profile">Profile</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="dashboard-main">

        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Track your expenses and manage your budget</p>
          </div>

          <button className="primary-btn">+ Add Expense</button>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">

          <div className="summary-card">
            <div className="summary-left">
              <span>Total Expenses</span>
              <strong>2,450 SAR</strong>
              <small className="green">+12% from last month</small>
            </div>
            <div className="summary-icon red">
              <img src="/icons/total.svg" alt="" />
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-left">
              <span>Highest Category</span>
              <strong>Food</strong>
              <small className="green">850 SAR this month</small>
            </div>
            <div className="summary-icon orange">
              <img src="/icons/food.svg" alt="" />
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-left">
              <span>Transactions</span>
              <strong>47</strong>
              <small className="green">+8% from last month</small>
            </div>
            <div className="summary-icon blue">
              <img src="/icons/transactions.svg" alt="" />
            </div>
          </div>

        </div>

        {/* Charts */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Expenses by Category</h3>
            <div className="chart-placeholder">Pie Chart</div>
          </div>

          <div className="chart-card">
            <h3>Spending Trend</h3>
            <div className="chart-placeholder">Line Chart</div>
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <h3>Recent Transactions</h3>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Nov 24, 2024</td>
                <td><span className="badge food">🍴 Food</span></td>
                <td>Lunch at restaurant</td>
                <td>45 SAR</td>
              </tr>

              <tr>
                <td>Nov 23, 2024</td>
                <td><span className="badge transport">🚗 Transport</span></td>
                <td>Uber ride</td>
                <td>25 SAR</td>
              </tr>

              <tr>
                <td>Nov 22, 2024</td>
                <td><span className="badge entertainment">🎮 Entertainment</span></td>
                <td>Movie tickets</td>
                <td>60 SAR</td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
