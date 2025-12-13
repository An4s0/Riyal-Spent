import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-title">
          <div className="auth-logo">
            <img src="/logo.svg" alt="logo" width="24" />
          </div>
          <span>Riyal Spent</span>
        </div>

        <nav className="sidebar-nav">
          <a className="active">Dashboard</a>
          <a>Expenses</a>
          <a>Categories</a>
          <a>Profile</a>
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
          <button className="add-btn">+ Add Expense</button>
        </div>

        {/* Stats */}
        <div className="stat-cards">
          <div className="stat-card">
            <div className="stat-title">Total Expenses</div>
            <div className="stat-value">2,450 SAR</div>
            <div className="stat-note">+12% from last month</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Highest Category</div>
            <div className="stat-value">Food</div>
            <div className="stat-note">850 SAR this month</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Transactions</div>
            <div className="stat-value">47</div>
            <div className="stat-note">+8% from last month</div>
          </div>
        </div>

        {/* Charts */}
        <div className="chart-row">
          <div className="chart-card">
            <div className="chart-title">Expenses by Category</div>
            <div className="chart-placeholder">Pie Chart</div>
          </div>

          <div className="chart-card">
            <div className="chart-title">Spending Trend</div>
            <div className="chart-placeholder">Line Chart</div>
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-header">Recent Transactions</div>

          <table className="table">
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
                <td>Food</td>
                <td>Lunch at restaurant</td>
                <td>45 SAR</td>
              </tr>
              <tr>
                <td>Nov 23, 2024</td>
                <td>Transport</td>
                <td>Uber ride</td>
                <td>25 SAR</td>
              </tr>
              <tr>
                <td>Nov 22, 2024</td>
                <td>Entertainment</td>
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
