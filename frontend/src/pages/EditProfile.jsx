import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
    LayoutDashboard, Wallet, Boxes, User, 
    ChevronDown, User as UserIcon, Mail, Settings, 
    Key, Download, ArrowLeft
} from 'lucide-react';
import './EditProfile.css'; 

// --- البيانات الوهمية (Mock Data) ---
const mockUserData = {
    fullName: 'Anas Almutary',
    email: 'anas@example.com',
    preferredCurrency: 'Saudi Riyal (SAR)',
};

const currencyOptions = [
    'Saudi Riyal (SAR)',
    'US Dollar (USD)',
    'Euro (EUR)',
    'British Pound (GBP)',
];

// بيانات الشريط الجانبي
const sidebarItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Expenses', path: '/expenses', icon: Wallet },
    { name: 'Categories', path: '/categories', icon: Boxes },
    { name: 'Profile', path: '/profile', icon: User }, // المسار النشط
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

const EditProfile = () => {
    const [formData, setFormData] = useState(mockUserData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        console.log("Saving changes:", formData);
        // منطق إرسال البيانات (API Call)
    };

    return (
        <div className="app-layout">
            <Sidebar /> 

            <main className="main-content">
                <header className="dashboard-header profile-header">
                    <div>
                        <h2>Edit Profile</h2>
                        <p className="header-subtitle">Update your personal information</p>
                    </div>
                </header>

                {/* 1. قسم معلومات التعديل الرئيسية */}
                <div className="edit-profile-panel">
                    <form onSubmit={handleSaveChanges}>
                        
                        {/* Full Name */}
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <div className="input-with-icon">
                                <UserIcon size={18} className="input-icon" />
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* Email Address */}
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-with-icon">
                                <Mail size={18} className="input-icon" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Preferred Currency */}
                        <div className="form-group">
                            <label htmlFor="preferredCurrency">Preferred Currency</label>
                            <div className="custom-select-wrapper">
                                <select
                                    id="preferredCurrency"
                                    name="preferredCurrency"
                                    value={formData.preferredCurrency}
                                    onChange={handleChange}
                                >
                                    {currencyOptions.map(currency => (
                                        <option key={currency} value={currency}>{currency}</option>
                                    ))}
                                </select>
                                <ChevronDown size={18} className="select-arrow" />
                            </div>
                        </div>

                        {/* أزرار الإجراءات */}
                        <div className="form-actions">
                            <Link to="/profile" className="btn-secondary">
                                <ArrowLeft size={16} /> Cancel
                            </Link>
                            <button type="button" className="btn-delete">
                                Delete Account
                            </button>
                            <button type="submit" className="btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* 2. قسم إعدادات الحساب (Account Settings) */}
                <div className="account-settings-panel">
                    <h3 className="settings-title">Account Settings</h3>
                    
                    {/* Change Password */}
                    <div className="setting-item">
                        <div className="setting-details">
                            <Key size={20} className="setting-icon orange-bg" />
                            <div>
                                <p className="setting-name">Change Password</p>
                                <p className="setting-description">Update your account password</p>
                            </div>
                        </div>
                        <Link to="/profile/password" className="setting-link">
                            Change <span className="arrow-icon">&gt;</span>
                        </Link>
                    </div>

                    {/* Export Data */}
                    <div className="setting-item">
                        <div className="setting-details">
                            <Download size={20} className="setting-icon purple-bg" />
                            <div>
                                <p className="setting-name">Export Data</p>
                                <p className="setting-description">Download your expense data</p>
                            </div>
                        </div>
                        <Link to="/profile/export" className="setting-link">
                            Export <span className="arrow-icon">&gt;</span>
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default EditProfile;