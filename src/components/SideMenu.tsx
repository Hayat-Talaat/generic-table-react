import React from "react";
import { NavLink } from "react-router-dom";

const SideMenu: React.FC = () => {
  const navItemStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "block p-4 text-white bg-blue-500 rounded"
      : "block p-4 text-gray-700 hover:bg-gray-100 rounded";

  return (
    <div className="w-64 h-screen bg-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6">Octane Dashboard</h2>
      <nav className="space-y-4">
        <NavLink to="/" className={navItemStyle}>
          Welcome
        </NavLink>
        <NavLink to="/orders" className={navItemStyle}>
          Orders Overview
        </NavLink>
        <NavLink to="/users" className={navItemStyle}>
          User Management
        </NavLink>
      </nav>
    </div>
  );
};

export default SideMenu;
