import React from "react";
import axios from "axios";

const EventCard = ({ event, onView, onRefresh }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isOwner = currentUser?.id === event.createdBy;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/events/${event.id}`);
        onRefresh(); // Refresh the events list
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete event.");
      }
    }
  };

  const handleJoin = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/events/${event.id}/join`, {
        userId: currentUser.id,
      });
      alert("Successfully joined the event!");
    } catch (error) {
      console.error("Join failed:", error);
      alert("Could not join the event.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
      <h3 className="text-xl font-bold text-blue-700 mb-2">{event.eventName}</h3>
      <p className="text-gray-600 mb-1">
        <strong>Destination:</strong> {event.destination}
      </p>
      <p className="text-gray-500 text-sm mb-3">{event.startDateTime}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => onView(event)}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
        >
          View Details
        </button>

        {isOwner ? (
          <>
            <button
              onClick={() => window.location.href = `/edit-event/${event.id}`}
              className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </>
        ) : (
          <button
            onClick={handleJoin}
            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
