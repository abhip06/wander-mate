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
      const res = await axios.post("http://localhost:5000/api/v1/events/create",
        formData,
        {withCredentials: true}
      );

      if(res.status === 200){
        alert("Event created successfully!");
        navigate(`/event/${res.data?.data?.id}`);
        return;
      }


      // Reset form
      // setFormData({
      //   tag: "",
      //   eventName: "",
      //   description: "",
      //   startDate: "",
      //   endDate: "",
      //   destination: "",
      // });
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
