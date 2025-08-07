import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
        About
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
        Wandermate is a vibrant platform built for travelers and explorers who love to 
        connect with like-minded individuals. Whether it’s a weekend hangout, a concert, 
        or a long trip, Wandermate helps you plan and join events effortlessly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">🌍 Travel Events</h3>
          <p className="text-gray-600">
            Discover long-distance trips organized by fellow adventurers. Find new
            places, cultures, and friends.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">☕ Hangouts</h3>
          <p className="text-gray-600">
            Want to meet over coffee, tea, or a casual outing? Hangout events help 
            break the ice and foster friendships.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">🎉 Occasions</h3>
          <p className="text-gray-600">
            Movie nights, concerts, or festive gatherings — occasional events bring 
            people together for fun times.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
          We aim to bridge gaps between travelers and explorers by making it easy to find 
          and join meaningful events. Wandermate isn’t just about travel, it’s about 
          building a community.
        </p>
      </div>
    </div>
  );
};

export default About;