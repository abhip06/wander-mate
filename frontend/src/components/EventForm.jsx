import React, { useState } from "react";
import axios from "axios";

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

  const categories = ["Travelling", "Hangout", "Occasional"];
  const statusOptions = ["Planned", "Ongoing", "Completed"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user changes something
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate date logic
    if (new Date(formData.endDateTime) < new Date(formData.startDateTime)) {
      setError("End date and time cannot be before start date and time.");
      return;
    }

    try {
      // Replace this with actual user ID on backend (e.g., via auth token)
      const res = await axios.post("http://localhost:8080/api/v1/events/create", {
        ...formData,
        createdBy: "current-user-id", // backend should extract this securely
      });

      alert("Event created successfully!");
      console.log(res.data);

      // Reset form
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
      setError("Failed to create event.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Create New Event</h2>

      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Tag Dropdown */}
        <div>
          <label className="block font-medium mb-1">Category / Tag</label>
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
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Status Dropdown */}
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
