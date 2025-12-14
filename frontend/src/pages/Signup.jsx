import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, EyeOff } from "lucide-react";
import "./Login.css";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
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
        <h1>Riyal Spent</h1>
        <p className="subtitle">Create your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input name="name" onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input name="email" onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input name="password" type="password" onChange={handleChange} required />
              <EyeOff size={18} className="eye-icon" />
            </div>
          </div>

          <button type="submit" className="login-btn">
            Sign Up
          </button>
        </form>

        <p className="footer-text">
          Already have an account?
          <Link to="/login" className="signup-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
