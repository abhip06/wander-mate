import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!location || !date) return alert("Please enter location and date");

    // Redirect with query parameters
    navigate(`/search?location=${encodeURIComponent(location)}&date=${date}`);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-800">Wander Mate</div>
        <ul className="hidden md:flex items-center space-x-8 text-base text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/profile" className="hover:text-blue-600">Profile</Link></li>
          <li><a href="#" className="hover:text-blue-600">About Us</a></li>
          <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          <li>
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700">Login</button>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700">Sign Up</button>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-50">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Welcome to Wander Mate</h2>
        <p className="text-lg text-gray-700 mb-6"><b>Split the cost, double the joy - travel smart with Wander Mate</b></p>
        <Link to="/create-event">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Create Event
          </button>
        </Link>
      </section>

      {/* Search Bar */}
      <div className="flex justify-center py-6">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-48 px-4 py-2 border rounded-l-md focus:outline-none"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-48 px-4 py-2 border focus:outline-none"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Services */}
      <section className="py-12 px-6">
        <h3 className="text-2xl font-bold text-center text-blue-600 mb-8">Our Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h4 className="text-xl font-semibold text-blue-500">Discover Events</h4>
            <p className="text-gray-600 mt-2">Explore a variety of social, travel, and fun events near you.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h4 className="text-xl font-semibold text-blue-500">Create Events</h4>
            <p className="text-gray-600 mt-2">Host your own events and connect with like-minded people.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h4 className="text-xl font-semibold text-blue-500">Easy Tagging</h4>
            <p className="text-gray-600 mt-2">Use tags like Travelling, Hangouts, or Occasional to categorize easily.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-blue-50 py-12 px-6 text-center">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">About Wander Mate</h3>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Wander Mate is your go-to platform for finding and hosting events that match your interests. Whether it's a trip, a tea break at the Nukkad, or a concert night — we're here to connect you with people and moments that matter.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow mt-10 py-4 text-center text-gray-600">
        &copy; 2025 Wander Mate. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
