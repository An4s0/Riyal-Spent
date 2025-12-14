import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) return;

    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <div className="logo-container">
          <div className="logo" />
        </div>

        <h1>Riyal Spent</h1>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                name="password"
                type={show ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
              {show ? (
                <EyeOff
                  size={18}
                  className="eye-icon"
                  onClick={() => setShow(false)}
                />
              ) : (
                <Eye
                  size={18}
                  className="eye-icon"
                  onClick={() => setShow(true)}
                />
              )}
            </div>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="footer-text">
            Don’t have an account?
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
