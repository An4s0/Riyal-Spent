import { useState } from "react";
import { apiPost } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const nav = useNavigate();
  const [msg, setMsg] = useState("");

  async function changePw() {
    const current = document.getElementById("current").value;
    const newPw = document.getElementById("newpw").value;
    const confirm = document.getElementById("confirm").value;

    if (newPw !== confirm) {
      setMsg("Passwords do not match.");
      return;
    }

    try {
      await apiPost("/auth/change-password", {
        currentPassword: current,
        newPassword: newPw
      });
      nav("/profile");
    } catch {
      setMsg("Password change failed.");
    }
  }

  return (
    <div className="page-container">
      <h2>Change Password</h2>

      <div className="card profile-card">
        <input id="current" className="input" type="password" placeholder="Current Password" />
        <input id="newpw" className="input" type="password" placeholder="New Password" />
        <input id="confirm" className="input" type="password" placeholder="Confirm Password" />

        <button className="btn-primary full" onClick={changePw}>Update Password</button>
        <p className="msg">{msg}</p>
      </div>
    </div>
  );
}
