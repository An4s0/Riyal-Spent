import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="full-center">
      <div className="auth-card large">

        {/* Logo */}
        <div className="auth-logo">
          <img src="/logo.svg" alt="icon" width="28" />
        </div>

        {/* Title */}
        <h1 className="auth-title">Riyal Spent</h1>
        <p className="auth-subtitle">
          Create your account to start tracking expenses
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSignup}>

          {/* Full Name */}
          <label className="auth-label">Full Name</label>
          <input
            className="auth-input"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <label className="auth-label" style={{ marginTop: "14px" }}>
            Email Address
          </label>
          <input
            className="auth-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <label className="auth-label" style={{ marginTop: "14px" }}>
            Password
          </label>
          <input
            className="auth-input"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <label className="auth-label" style={{ marginTop: "14px" }}>
            Confirm Password
          </label>
          <input
            className="auth-input"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Terms */}
          <div className="auth-terms">
            <input type="checkbox" required />
            <span>
              I agree to the{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </span>
          </div>

          {/* Button */}
          <button className="auth-btn" type="submit">
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="auth-bottom">
          Already have an account?
          <Link to="/login" className="auth-link">Login</Link>
        </p>

      </div>
    </div>
  );
}
