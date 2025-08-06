import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const user = {
    name: "Sayalee",
    avatar: "https://i.pravatar.cc/150?img=47", // Replace with user avatar
  };

  return (
    <header className="bg-white shadow-md px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-800">
        <Link to="/">Wander Mate</Link>
      </div>

      {/* Navigation Links + Profile (Right Side) */}
      <div className="flex items-center space-x-6">
        <nav className="hidden md:flex space-x-16 text-gray-500 font-medium text-base">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/events" className="hover:text-blue-600">Events</Link>
          <Link to="/about" className="hover:text-blue-600">About Us</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </nav>

        {/* Profile Picture */}
        <Link to="/profile">
          <img
            src={user.avatar}
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer hover:scale-105 transition"
            title={user.name}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
