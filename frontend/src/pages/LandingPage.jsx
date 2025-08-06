import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
  
import axios from "axios";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!location || !date) return alert("Please enter location and date");

    // Redirect with query parameters
    navigate(`/search?location=${encodeURIComponent(location)}&date=${date}`);
  };
  
  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/events");
        setEvents(res.data.data); // Assuming response = { code, data, message, success }
      } catch (error) {
        console.error("Error fetching events:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="text-center py-20 px-4 bg-blue-50 flex-1">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">
          Welcome to Wander Mate
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Plan together. Travel smarter. Split the cost. Make memories.
        </p>
        <Link to="/signup">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </section>

      {/* Dynamic Events Section */}
      <section className="py-16 px-8 bg-white">
        <h3 className="text-2xl font-bold text-center text-blue-600 mb-10">
          Upcoming Events
        </h3>
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

        {loading ? (
          <p className="text-center text-gray-500">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-blue-100 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition"
              >
                <h4 className="text-xl font-semibold text-blue-700 mb-2">
                  {event.name}
                </h4>
                <p className="text-gray-700 line-clamp-3">{event.description}</p>
                <p className="text-sm text-gray-600 mt-2">
                  📍 {event.location} | 🗓️{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white text-center py-16 px-6">
        <h3 className="text-2xl font-bold mb-4">Ready to explore together?</h3>
        <p className="mb-6">Join now and make your travel experiences joyful and affordable.</p>
        <Link to="/signup">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100 transition">
            Sign Up Free
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 bg-white border-t mt-4">
        © {new Date().getFullYear()} Wander Mate. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
