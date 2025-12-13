import { useState } from "react";
import api from "../api/api";
import "../styles/changePassword.css";

export default function ChangePassword() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await api.post("/auth/change-password", {
        current_password: current,
        new_password: next,
      });
      setMsg("Password updated successfully");
    } catch {
      setMsg("Failed to update password");
    }
  };

  return (
    <div className="change-password-container">
      <h1>Change Password</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Current Password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
        />

        <button>Update Password</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}

