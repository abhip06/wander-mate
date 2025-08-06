import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white">
      <Link to="/" className="text-2xl font-bold text-blue-800">
        Wander Mate
      </Link>

      <ul className="flex items-center space-x-6 text-base font-medium">
        <li>
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/login" className={isActive("/login")}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/signup" className={isActive("/signup")}>
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
