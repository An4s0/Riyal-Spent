import { useNavigate } from "react-router-dom";
import "../styles/expenses.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="expenses-page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className="summary-card" style={{ maxWidth: "420px" }}>
        <h1 style={{ fontSize: "64px", margin: "0" }}>404</h1>
        <p style={{ marginBottom: "20px", color: "#6b7280" }}>
          Page not found
        </p>

        <p style={{ marginBottom: "24px" }}>
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <button
            className="add-expense-btn"
            onClick={() => navigate("/expenses")}
          >
            Go to Expenses
          </button>

          <button onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}