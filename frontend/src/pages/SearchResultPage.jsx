import React, { useEffect, useState } from "react";
import EventDetails from "../components/EventDetails";
import MatchedUsers from "../components/MatchedUsers";

const SearchResultPage = () => {
  const [eventData, setEventData] = useState(null);
  const [matchedUsers, setMatchedUsers] = useState([]);

  useEffect(() => {
    // Dummy data; Replace with real API fetch
    const fetchedEvent = {
      eventName: "Mountain Trip",
      tag: "Travelling",
      description: "A weekend mountain trip with friends.",
      startDateTime: "2025-08-12T10:00",
      endDateTime: "2025-08-14T18:00",
      destination: "Manali",
      status: "Planned",
    };

    const fetchedUsers = [
      {
        name: "Rohit Sharma",
        email: "rohit@example.com",
        profileImage: "https://i.pravatar.cc/100?img=1",
      },
      {
        name: "Priya Singh",
        email: "priya@example.com",
        profileImage: "https://i.pravatar.cc/100?img=5",
      },
    ];

    setEventData(fetchedEvent);
    setMatchedUsers(fetchedUsers);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Search Results
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <EventDetails event={eventData} />
        <MatchedUsers users={matchedUsers} />
      </div>
    </div>
  );
};

export default SearchResultPage;
