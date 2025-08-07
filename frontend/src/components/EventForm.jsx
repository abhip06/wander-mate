import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    tag: "",
    eventName: "",
    description: "",
    startDate: "",
    endDate: "",
    destination: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const categories = ["TRAVELLING", "HANGOUT", "OCCASIONAL"];


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.endDateTime) < new Date(formData.startDateTime)) {
      setError("End date and time cannot be before start date and time.");
      return;
    }

    try {

      // Replace this with actual user ID on backend (e.g., via auth token)
      const res = await axios.post("http://localhost:5000/api/v1/events/create",
        formData,
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("Event created successfully!");
        navigate(`/event/${res.data?.data?.id}`);
        return;
      }




    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage: "url('/create-event-bg.jpg')",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-blue-900/50 z-0"></div>

      {/* Form Card */}
      <div className="relative z-10 max-w-4xl w-full p-10 bg-white/0 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">

        <h2 className="text-4xl font-bold mb-6 text-center text-white drop-shadow">
          Create New Event
        </h2>
        {error && (
          <div className="mb-4 text-red-300 font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tag Dropdown */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-white mb-2">Category / Tag</label>
            <select
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80 text-gray-800"
            >
              <option value="">Select Category</option>
              {categories.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          {/* Event Name */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-white mb-2">Event Name</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80 text-gray-800"
            />
          </div>

          {/* Destination */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-white mb-2">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80 text-gray-800"
            />
          </div>


          {/* Start Date & Time */}
          <div>
            <label className="block font-medium mb-1">Start Date & Time</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* End Date & Time */}
          <div>
            <label className="block font-medium mb-1">End Date & Time</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>



          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-white mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80 text-gray-800 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md shadow-lg transition duration-200"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>

    </div >
  );
};

export default CreateEventForm;
