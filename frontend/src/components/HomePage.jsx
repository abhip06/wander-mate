import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage or auth token
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-blue-100">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
          Welcome back, {user?.name || "Traveler"}!
        </h2>
        <p className="text-gray-700 text-lg max-w-xl mx-auto">
          Ready to plan your next adventure? Check your events, explore trips, and connect with travel buddies.
        </p>
      </section>

      {/* Content Sections */}
      <section className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Your Events */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Your Events</h3>
          <p className="text-gray-600">View and manage your planned events.</p>
          <button
            onClick={() => navigate("/events")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            View Events
          </button>
        </div>

        {/* Explore Trips */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Explore Trips</h3>
          <p className="text-gray-600">Find interesting trips shared by others.</p>
          <button
            onClick={() => navigate("/explore")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Explore
          </button>
        </div>

        {/* Suggestions */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Suggestions</h3>
          <p className="text-gray-600">Connect with people who have similar travel plans.</p>
          <button
            onClick={() => navigate("/suggestions")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            View Matches
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 mt-10 border-t">
        © {new Date().getFullYear()} Wander Mate. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
