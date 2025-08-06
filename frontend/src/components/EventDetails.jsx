import React from "react";

const EventDetails = ({ event }) => {
  if (!event) return <p className="text-center text-gray-500">No event selected.</p>;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">{event.eventName}</h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Category:</span> {event.tag}
        </p>
        <p>
          <span className="font-semibold">Description:</span> {event.description}
        </p>
        <p>
          <span className="font-semibold">Start:</span>{" "}
          {new Date(event.startDateTime).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">End:</span>{" "}
          {new Date(event.endDateTime).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Destination:</span> {event.destination}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`inline-block px-2 py-1 rounded text-white text-sm ${
              event.status === "ACTIVE"
                ? "bg-green-500"
                : event.status === "COMPLETED"
                ? "bg-gray-500"
                : "bg-yellow-500"
            }`}
          >
            {event.status}
          </span>
        </p>
        {event.createdBy && (
          <p>
            <span className="font-semibold">Created By:</span> {event.createdBy.name || event.createdBy.email}
          </p>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
