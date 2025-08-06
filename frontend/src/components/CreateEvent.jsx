import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    tag: "",
    eventName: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    destination: "",
    status: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = ["Travelling", "Hangout", "Occasional"];
  const statusOptions = ["Planned", "Ongoing", "Completed"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.endDateTime) < new Date(formData.startDateTime)) {
      setError("❌ End date and time cannot be before start date and time.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/events/create", {
        ...formData,
        createdBy: "current-user-id", // replace with auth context later
      });

      setSuccess("✅ Event created successfully!");
      setFormData({
        tag: "",
        eventName: "",
        description: "",
        startDateTime: "",
        endDateTime: "",
        destination: "",
        status: "",
      });
    } catch (err) {
      console.error("Error creating event:", err);
      setError("❌ Failed to create event. Please try again.");
    }
  };

  return (
    <>
      
      <div className="min-h-screen bg-blue-50 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Create New Event
          </h2>

          {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
          {success && <p className="text-green-600 font-semibold mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
            {/* Category */}
            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
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
            <div>
              <label className="block font-medium mb-1">Event Name</label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
                placeholder="e.g., Goa Trip"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                placeholder="Describe your event..."
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Start Date & Time */}
            <div>
              <label className="block font-medium mb-1">Start Date & Time</label>
              <input
                type="datetime-local"
                name="startDateTime"
                value={formData.startDateTime}
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
                name="endDateTime"
                value={formData.endDateTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block font-medium mb-1">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                placeholder="e.g., Manali, Lonavala"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Select Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateEventForm;
