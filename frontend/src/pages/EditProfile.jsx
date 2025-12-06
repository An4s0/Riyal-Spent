import { useEffect, useState } from "react";
import { apiGet, apiPut } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const nav = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    apiGet("/profile").then((data) => {
      document.getElementById("name").value = data.name;
      document.getElementById("email").value = data.email;
      document.getElementById("currency").value = data.currency;
    });
  }, []);

  async function save() {
    try {
      await apiPut("/profile", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        currency: document.getElementById("currency").value
      });

      nav("/profile");
    } catch {
      setMsg("Update failed.");
    }
  }

  return (
    <div className="page-container">
      <h2>Edit Profile</h2>

      <div className="card profile-card">
        <input id="name" className="input" />
        <input id="email" className="input" />

        <select id="currency" className="input">
          <option value="SAR">SAR</option>
          <option value="USD">USD</option>
        </select>

        <button className="btn-primary full" onClick={save}>Save</button>
        <p className="msg">{msg}</p>
      </div>
    </div>
  );
}
