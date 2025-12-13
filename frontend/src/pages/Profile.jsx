import "../styles/profile.css";

export default function Profile() {
  return (
    <div className="profile-container">

      <div className="profile-header">
        <h1>Profile</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="profile-card">
        <div>
          <div className="profile-name">Anas Almutary</div>
          <div className="profile-date">Member since November 2024</div>
        </div>

        {/* Info */}
        <div className="profile-section">
          <h3>Profile Information</h3>
          <div className="info-grid">
            <div className="info-box">Full Name<br />Anas Almutary</div>
            <div className="info-box">Email Address<br />anas@email.com</div>
          </div>
        </div>

        {/* Stats */}
        <div className="profile-section">
          <h3>Account Statistics</h3>
          <div className="stats-grid">
            <div className="stat-box">
              <span>Total Expenses</span>
              <strong>2,450 SAR</strong>
            </div>
            <div className="stat-box">
              <span>Categories Used</span>
              <strong>5</strong>
            </div>
            <div className="stat-box">
              <span>Total Transactions</span>
              <strong>47</strong>
            </div>
            <div className="stat-box">
              <span>Last Activity</span>
              <strong>Today</strong>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="actions">
          <div className="action-item">
            <div>
              <span>Edit Profile</span>
              <p>Update your personal information</p>
            </div>
            →
          </div>

          <div className="action-item">
            <div>
              <span>Change Password</span>
              <p>Update your account password</p>
            </div>
            →
          </div>

          <div className="action-item logout">
            <div>
              <span>Logout</span>
              <p>Sign out of your account</p>
            </div>
            →
          </div>
        </div>
      </div>
    </div>
  );
}

