import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="full-center">
      <div className="auth-card">

        <div className="auth-logo">
          <img src="/logo.svg" alt="logo" width="28" />
        </div>

        <h1 className="auth-title">Riyal Spent</h1>
        <p className="auth-subtitle">
          Welcome back! Please login to your account
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleLogin}>
          <label className="auth-label">Email Address</label>
          <input
            className="auth-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn">Login</button>
        </form>

        <p className="auth-bottom">
          Don’t have an account?
          <Link to="/signup" className="auth-link"> Sign up</Link>
        </p>
      </div>
    </div>
  );
}
