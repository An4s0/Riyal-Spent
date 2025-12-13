import "../styles/editProfile.css";

export default function EditProfile() {
  return (
    <div className="edit-profile-container">

      <div className="edit-header">
        <h1>Edit Profile</h1>
        <p>Update your personal information and preferences</p>
      </div>

      <div className="edit-card">

        <div className="form-group">
          <label>Full Name</label>
          <input type="text" defaultValue="Anas Almutary" />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" defaultValue="anas@email.com" />
        </div>

        <div className="form-group">
          <label>Preferred Currency</label>
          <select defaultValue="SAR">
            <option value="SAR">Saudi Riyal (SAR)</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="btn-primary">Save Changes</button>
          <button className="btn-secondary">Cancel</button>
          <button className="btn-danger">Delete Account</button>
        </div>

        {/* Account Settings */}
        <div className="settings">
          <h3>Account Settings</h3>

          <div className="setting-item">
            <div>
              <span>Change Password</span>
              <p>Update your account password</p>
            </div>
            →
          </div>

          <div className="setting-item">
            <div>
              <span>Export Data</span>
              <p>Download a copy of your expense data</p>
            </div>
            →
          </div>
        </div>

      </div>
    </div>
  );
}
