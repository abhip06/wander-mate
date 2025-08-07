import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const LandingPage = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);

  const handleSearch = () => {
    if (!location || !date) return alert("Please enter location and date");
    navigate(`/search?location=${encodeURIComponent(location)}&date=${date}`);
  };

  const navigateCreateEvent = () => {
    if (!authStatus) {
      toast.error("You are not authenticated. Please login.");
      navigate("/login");
      return;
    }

    navigate("/create-event");
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-100 font-sans w-full">
      {/* ==================== Main Content ==================== */}
      <main className="w-full px-0">

        {/* Hero Section */}
        <section
          className="relative w-full text-center py-[350px] bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 text-white px-4">
            <h2 className="text-4xl font-bold mb-4 opacity-90">Welcome to Wander Mate</h2>
            <p className="text-lg font-medium mb-6 opacity-80 max-w-xl mx-auto">
              <b>Split the cost, double the joy - travel smart with Wander Mate</b>
            </p>
            
              <button 
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition mb-8"
              onClick={navigateCreateEvent}
              >
                Create Event
              </button>

            {/* Search Bar */}
            <div className="flex justify-center flex-wrap gap-3 max-w-2xl mx-auto mt-4">
              <input
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 min-w-[220px] px-4 py-2 rounded-l-md focus:outline-none text-black placeholder:text-black border border-gray-300"
              />
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 min-w-[200px] px-4 py-2 focus:outline-none text-black placeholder:text-black border border-gray-300"
              />
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          className="w-full py-[300px] px-6 bg-cover bg-center"
          style={{ backgroundImage: "url('/services-bg.jpg')" }}
        >
          <h3 className="text-3xl font-bold text-center text-white mb-14 opacity-90">Our Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full px-4">
            {[
              {
                title: "Discover Events",
                desc: "Explore a variety of social, travel, and fun events near you.",
              },
              {
                title: "Create Events",
                desc: "Host your own events and connect with like-minded people.",
              },
              {
                title: "Easy Tagging",
                desc: "Use tags like Travelling, Hangouts, or Occasional to categorize easily.",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-lg text-center text-white hover:scale-105 transition-transform duration-300"
              >
                <h4 className="text-xl font-semibold mb-2 text-blue-300">{service.title}</h4>
                <p className="opacity-90">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section
          className="relative w-full bg-cover bg-center bg-no-repeat py-[320px] px-6 text-center"
          style={{ backgroundImage: "url('/about-wander-mate.png')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-white">
            <h3 className="text-3xl font-bold mb-6">About Wander Mate</h3>
            <p className="max-w-3xl mx-auto leading-relaxed text-lg">
              Wander Mate is your go-to platform for finding and hosting events that match your interests.
              Whether it's a trip, a tea break at the Nukkad, or a concert night — we're here to connect you
              with people and moments that matter.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
};

export default LandingPage;
