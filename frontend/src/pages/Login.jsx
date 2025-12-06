import { useState } from "react";
import { apiPost } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [msg, setMsg] = useState("");

  async function login() {
    try {
      const res = await apiPost("/auth/login", {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      });

      localStorage.setItem("token", res.token);
      nav("/dashboard");
    } catch (err) {
      setMsg(err.message || "Login failed.");
    }
  }

  return (
    <div className="auth-container">
      <h1>Welcome Back</h1>
      <p className="subtitle">Login to continue</p>

      <input id="email" className="input" placeholder="Email" />
      <input id="password" type="password" className="input" placeholder="Password" />

      <button className="btn-primary" onClick={login}>Login</button>
      <p className="msg">{msg}</p>

      <p className="switch-text">
        New here? <a href="/signup">Create an account</a>
      </p>
    </div>
  );
}
