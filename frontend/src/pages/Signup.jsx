import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/signup", {
        full_name: fullName,
        email,
        password,
      });

      navigate("/login");
    } catch {
      setError("Signup failed");
    }
  };

  return (
    <div className="full-center">
      <div className="auth-card large">

        <div className="auth-logo">
          <img src="/logo.svg" alt="logo" width="28" />
        </div>

        <h1 className="auth-title">Riyal Spent</h1>
        <p className="auth-subtitle">
          Create your account to start tracking expenses
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSignup}>
          <label className="auth-label">Full Name</label>
          <input
            className="auth-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
          />

          <label className="auth-label">Email Address</label>
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />

          <label className="auth-label">Confirm Password</label>
          <input
            className="auth-input"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm password"
          />

          <button className="auth-btn">Sign Up</button>
        </form>

        <p className="auth-bottom">
          Already have an account?
          <Link to="/login" className="auth-link"> Login</Link>
        </p>
      </div>
    </div>
  );
}
