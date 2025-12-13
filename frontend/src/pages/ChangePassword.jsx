import "../styles/changePassword.css";

export default function ChangePassword() {
  return (
    <div className="change-password-container">

      <div className="cp-header">
        <h1>Change Password</h1>
        <p>Update your account password</p>
      </div>

      <div className="cp-card">

        <div className="form-group">
          <label>Current Password</label>
          <input type="password" placeholder="Enter current password" />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input type="password" placeholder="Enter new password" />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input type="password" placeholder="Confirm new password" />
        </div>

        <div className="cp-actions">
          <button className="btn-primary">Update Password</button>
          <button className="btn-secondary">Cancel</button>
        </div>

      </div>
    </div>
  );
}
