import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
    LayoutDashboard, Wallet, Boxes, User, 
    Edit3, Lock, LogOut 
} from 'lucide-react';
// import './index.css'; // للتنسيقات العامة
import './Profile.css';

// --- البيانات الوهمية (Mock Data) ---
const userData = {
    fullName: 'Anas Almutary',
    email: 'anas@email.com',
    memberSince: 'November 2024',
    totalExpenses: '2,450 SAR',
    categoriesUsed: 5,
    totalTransactions: 47,
    lastActivity: 'Today',
};

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

const Profile = () => {
    return (
        <div className="app-layout">
            <Sidebar /> 

            <main className="main-content">
                <header className="dashboard-header">
                    <div>
                        <h2>Profile</h2>
                        <p className="header-subtitle">Manage your account settings and preferences</p>
                    </div>
                </header>

                {/* 1. قسم المعلومات الأساسية والإحصائيات */}
                <div className="profile-panel">
                    
                    {/* معلومات المستخدم الرئيسية */}
                    <div className="user-header-info">
                        <h3>{userData.fullName}</h3>
                        <p className="member-status">Member since {userData.memberSince}</p>
                    </div>

                    {/* معلومات الملف الشخصي (Profile Information) */}
                    <h4 className="section-title">Profile Information</h4>
                    <div className="profile-info-grid">
                        
                        {/* Full Name */}
                        <div className="info-item">
                            <label>Full Name</label>
                            <p className="info-value">{userData.fullName}</p>
                        </div>
                        
                        {/* Email Address */}
                        <div className="info-item">
                            <label>Email Address</label>
                            <p className="info-value">{userData.email}</p>
                        </div>
                    </div>

                    {/* إحصائيات الحساب (Account Statistics) */}
                    <h4 className="section-title">Account Statistics</h4>
                    <div className="stats-grid">
                        
                        {/* Total Expenses */}
                        <div className="stat-item">
                            <label>Total Expenses</label>
                            <p className="stat-value">{userData.totalExpenses}</p>
                        </div>
                        
                        {/* Categories Used */}
                        <div className="stat-item">
                            <label>Categories Used</label>
                            <p className="stat-value">{userData.categoriesUsed}</p>
                        </div>
                        
                        {/* Total Transactions */}
                        <div className="stat-item">
                            <label>Total Transactions</label>
                            <p className="stat-value">{userData.totalTransactions}</p>
                        </div>
                        
                        {/* Last Activity */}
                        <div className="stat-item">
                            <label>Last Activity</label>
                            <p className="stat-value">{userData.lastActivity}</p>
                        </div>
                    </div>
                </div>

                {/* 2. قسم إجراءات الحساب (Account Actions) */}
                <div className="account-actions-panel">
                    <h4 className="section-title">Account Actions</h4>
                    
                    {/* Edit Profile - مرتبط بمسار /profile/edit */}
                    <Link to="/profile/edit" className="action-item edit-action">
                        <div className="action-details">
                            <Edit3 size={20} className="action-icon blue-icon" />
                            <div>
                                <p className="action-name">Edit Profile</p>
                                <p className="action-description">Update your personal information</p>
                            </div>
                        </div>
                        <span className="arrow-icon">&gt;</span>
                    </Link>

                    {/* Change Password - مرتبط بمسار /profile/password */}
                    <Link to="/profile/password" className="action-item password-action">
                        <div className="action-details">
                            <Lock size={20} className="action-icon orange-icon" />
                            <div>
                                <p className="action-name">Change Password</p>
                                <p className="action-description">Update your account password</p>
                            </div>
                        </div>
                        <span className="arrow-icon">&gt;</span>
                    </Link>

                    {/* Logout */}
                    <button className="action-item logout-action" onClick={() => console.log('Logging out...')}>
                        <div className="action-details">
                            <LogOut size={20} className="action-icon red-icon" />
                            <div>
                                <p className="action-name">Logout</p>
                                <p className="action-description">Sign out of your account</p>
                            </div>
                        </div>
                        <span className="arrow-icon">&gt;</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Profile;