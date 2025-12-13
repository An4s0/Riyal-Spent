import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dashboardRes = await api.get("/dashboard");
      const categoriesRes = await api.get("/categories");

      setData(dashboardRes.data);
      setCategories(categoriesRes.data);
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <div className="summary-grid">
        <div className="summary-card">
          <span>Total Expenses</span>
          <strong>{data.total_expenses} SAR</strong>
        </div>
        <div className="summary-card">
          <span>Monthly Spending</span>
          <strong>{data.monthly_spending} SAR</strong>
        </div>
      </div>

      <h2>Categories</h2>
      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            {c.icon} {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
