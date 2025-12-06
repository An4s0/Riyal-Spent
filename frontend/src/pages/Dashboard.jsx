import { useEffect, useState } from "react";
import { apiGet } from "../api/api";
import Chart from "chart.js/auto";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await apiGet("/dashboard");
      setSummary(data);

      new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
          labels: data.categories.map(c => c.category),
          datasets: [{ data: data.categories.map(c => c.total) }]
        }
      });

      new Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
          labels: data.monthly.map(m => m.month),
          datasets: [{ data: data.monthly.map(m => m.total) }]
        }
      });
    }
    load();
  }, []);

  if (!summary) return <h2>Loading...</h2>;

  return (
    <div className="page-container">
      <h2>Dashboard</h2>

      <div className="card-grid">
        <div className="card"><label>Total Spent</label><h2>{summary.total} SAR</h2></div>
        <div className="card"><label>Daily Avg</label><h2>{summary.averageDaily} SAR</h2></div>
        <div className="card"><label>Expenses</label><h2>{summary.count}</h2></div>
      </div>

      <div className="chart-row">
        <canvas id="pieChart"></canvas>
        <canvas id="lineChart"></canvas>
      </div>

      <h3>Recent Expenses</h3>
      {summary.recent.map((e, i) => (
        <div className="expense-item" key={i}>
          <div><strong>{e.title}</strong><br /><small>{e.category}</small></div>
          <strong>{e.amount} SAR</strong>
        </div>
      ))}
    </div>
  );
}
