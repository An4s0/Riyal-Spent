import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      {/* Content */}
      <div className="notfound-content">
        <div className="notfound-icon">⚠️</div>

        <h1>404</h1>
        <h2>Page Not Found</h2>

        <p>
          Oops! The page you're looking for doesn't exist.
          <br />
          It might have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="notfound-actions">
          <button
            className="btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Home
          </button>

          <button className="btn-secondary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>

        {/* Suggestions */}
        <div className="notfound-suggestions">
          <h3>You might want to:</h3>

          <div className="suggestions-grid">
            <button onClick={() => navigate("/dashboard")}>
              View Dashboard
            </button>

            <button onClick={() => navigate("/expenses")}>
              View Expenses
            </button>

            <button onClick={() => navigate("/categories")}>
              View Categories
            </button>

            <button onClick={() => navigate("/profile")}>
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}