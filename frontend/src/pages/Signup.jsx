import { useState } from "react";
import { apiPost } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  const [msg, setMsg] = useState("");

  async function signup() {
    try {
      await apiPost("/auth/signup", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      });

      nav("/login");
    } catch (err) {
      setMsg(err.message || "Registration failed.");
    }
  }

  return (
    <div className="auth-container">
      <h1>Create Account</h1>

      <input id="name" className="input" placeholder="Full Name" />
      <input id="email" className="input" placeholder="Email" />
      <input id="password" type="password" className="input" placeholder="Password" />

      <button className="btn-primary" onClick={signup}>Sign Up</button>
      <p className="msg">{msg}</p>

      <p className="switch-text">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
