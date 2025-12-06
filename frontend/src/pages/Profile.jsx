import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    apiGet("/profile").then(setUser);
  }, []);

  async function deleteAcc() {
    if (!confirm("Delete account?")) return;
    await apiDelete("/profile");
    localStorage.removeItem("token");
    nav("/login");
  }

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="page-container">
      <h2>Profile</h2>

      <div className="card profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Currency:</strong> {user.currency}</p>

        <a className="btn-primary full" href="/profile/edit">Edit Profile</a>
        <a className="btn-secondary full" href="/profile/change-password">Change Password</a>
        <button className="btn-danger full" onClick={deleteAcc}>Delete Account</button>
      </div>
    </div>
  );
}
