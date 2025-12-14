import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
    LayoutDashboard, Wallet, Boxes, User, 
    Lock, ArrowLeft, Eye, EyeOff, Check, AlertTriangle, Key
} from 'lucide-react';
// import './index.css'; 
import './ChangePassword.css'; 

// بيانات الشريط الجانبي
const sidebarItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Expenses', path: '/expenses', icon: Wallet },
    { name: 'Categories', path: '/categories', icon: Boxes },
    { name: 'Profile', path: '/profile', icon: User }, // المسار النشط
];

// متطلبات كلمة المرور
const passwordRequirements = [
    { key: 'length', text: 'At least 8 characters long' },
    { key: 'uppercase', text: 'One uppercase letter' },
    { key: 'lowercase', text: 'One lowercase letter' },
    { key: 'number', text: 'One number' },
    { key: 'specialChar', text: 'One special character (@#$%!&*...)' },
];

// ----------------------------------------------------
// مكون الشريط الجانبي (Sidebar)
// ----------------------------------------------------
const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-logo">Riyal Spent</h2>
            <nav className="sidebar-nav">
                {sidebarItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => 
                            // تفعيل فئة 'active' للملف الشخصي
                            item.name === 'Profile' ? "nav-item active" : "nav-item"
                        }
                    >
                        <item.icon size={18} />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};
// ----------------------------------------------------

const ChangePassword = () => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const validatePassword = (password) => {
        const results = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
        };
        return results;
    };

    const passwordValidation = validatePassword(passwords.newPassword);
    const passwordsMatch = passwords.newPassword === passwords.confirmNewPassword && passwords.newPassword !== '';
    const isFormValid = Object.values(passwordValidation).every(v => v) && passwordsMatch && passwords.currentPassword !== '';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log("Password Updated!");
            // منطق إرسال البيانات (API Call)
        } else {
            console.log("Form is invalid.");
        }
    };

    const PasswordToggle = ({ field }) => (
        <button 
            type="button" 
            className="password-toggle-btn"
            onClick={() => togglePasswordVisibility(field)}
        >
            {showPassword[field] ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
    );

    const RequirementItem = ({ reqKey, text }) => {
        const isValid = passwordValidation[reqKey];
        const iconColor = isValid ? '#28a745' : '#6b7280';
        return (
            <li className={`requirement-item ${isValid ? 'valid' : 'invalid'}`}>
                <div className="icon-placeholder" style={{ backgroundColor: isValid ? '#e6f7ee' : '#f3f4f6' }}>
                    {isValid ? <Check size={12} color="#28a745" /> : <Lock size={12} color="#6b7280" />}
                </div>
                <span>{text}</span>
            </li>
        );
    };

    return (
        <div className="app-layout">
            <Sidebar /> 

            <main className="main-content">
                <header className="change-password-header">
                    <Link to="/profile" className="back-link">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h2>Change Password</h2>
                        <p className="header-subtitle">Update your account password for security</p>
                    </div>
                </header>

                <div className="security-settings-panel">
                    <div className="panel-header">
                        <div className="lock-icon-bg">
                            <Lock size={20} color="#4a90e2" />
                        </div>
                        <div>
                            <h3 className="settings-title">Security Settings</h3>
                            <p className="settings-subtitle">Keep your account secure with a strong password</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        
                        {/* Current Password */}
                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <div className="input-with-toggle">
                                <input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type={showPassword.current ? 'text' : 'password'}
                                    placeholder="Enter your current password"
                                    value={passwords.currentPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <PasswordToggle field="current" />
                            </div>
                        </div>
                        
                        {/* New Password */}
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <div className="input-with-toggle">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword.new ? 'text' : 'password'}
                                    placeholder="Enter your new password"
                                    value={passwords.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <PasswordToggle field="new" />
                            </div>
                            {passwords.newPassword && (
                                <p className="password-strength">Password strength will appear here</p>
                            )}
                        </div>

                        {/* Confirm New Password */}
                        <div className="form-group">
                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                            <div className="input-with-toggle">
                                <input
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    type={showPassword.confirm ? 'text' : 'password'}
                                    placeholder="Confirm your new password"
                                    value={passwords.confirmNewPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <PasswordToggle field="confirm" />
                            </div>
                            {!passwordsMatch && passwords.confirmNewPassword && (
                                <p className="error-message">Passwords do not match.</p>
                            )}
                        </div>

                        {/* Password Requirements */}
                        <div className="password-requirements-box">
                            <h5 className="requirements-header">Password Requirements:</h5>
                            <ul className="requirements-list">
                                {passwordRequirements.map(req => (
                                    <RequirementItem key={req.key} reqKey={req.key} text={req.text} />
                                ))}
                            </ul>
                        </div>
                        
                        {/* Form Actions */}
                        <div className="form-actions-buttons">
                            <button 
                                type="submit" 
                                className="btn-primary" 
                                disabled={!isFormValid}
                            >
                                <Lock size={18} /> Update Password
                            </button>
                            <Link to="/profile" className="btn-cancel">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Security Tips */}
                <div className="security-tips-panel">
                    <div className="panel-header">
                        <div className="alert-icon-bg">
                            <AlertTriangle size={20} color="#4a90e2" />
                        </div>
                        <div>
                            <h3 className="settings-title">Security Tips</h3>
                            <ul className="tips-list">
                                <li>Use a unique password that you don't use elsewhere</li>
                                <li>Consider using a password manager</li>
                                <li>Change your password regularly</li>
                                <li>Never share your password with others</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChangePassword;