import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import EventDetails from "../components/EventDetails";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/events");
      setEvents(response.data);
    } catch (err) {
      setError("Failed to fetch events.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchEvents();
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <p className="text-center py-10">Loading events...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">All Events</h1>

      {/* Event details */}
      {selectedEvent && (
        <div className="mb-10">
          <EventDetails event={selectedEvent} />
        </div>
      )}

      {/* Event cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onView={handleViewEvent}
            onRefresh={handleRefresh}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
