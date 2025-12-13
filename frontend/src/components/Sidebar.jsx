import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/shell.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <img className="brandLogo" src={logo} alt="Riyal Spent" />
        <div className="brandName">Riyal Spent</div>
      </div>

      <nav className="nav">
        <NavLink to="/dashboard" className={({isActive}) => "navItem" + (isActive ? " active" : "")}>
          Dashboard
        </NavLink>
        <NavLink to="/expenses" className={({isActive}) => "navItem" + (isActive ? " active" : "")}>
          Expenses
        </NavLink>
        <NavLink to="/categories" className={({isActive}) => "navItem" + (isActive ? " active" : "")}>
          Categories
        </NavLink>
        <NavLink to="/profile" className={({isActive}) => "navItem" + (isActive ? " active" : "")}>
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}
