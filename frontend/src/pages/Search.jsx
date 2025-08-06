import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Search = () => {
    const locationHook = useLocation();
    const queryParams = new URLSearchParams(locationHook.search);
    const location = queryParams.get("location");
    const date = queryParams.get("date");

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/v1/events/search?location=${location}&date=${date}`
                );
                setResults(res.data);
            } catch (err) {
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (location && date) {
            fetchResults();
        }
    }, [location, date]);

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
                Search Results
            </h2>

            {loading && (
                <div className="flex justify-center items-center">
                    <div className="w-10 h-10 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
                </div>
            )}

            {error && (
                <div className="text-center text-red-600 font-semibold">{error}</div>
            )}

            {!loading && !error && results.length === 0 && (
                <div className="text-center text-gray-500">No results found.</div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {results.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 border-l-4 border-blue-600"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-blue-700">{item.eventName}</h3>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium uppercase">
                                {item.tag}
                            </span>
                        </div>

                        <p className="text-gray-700 text-sm mb-3">{item.description}</p>

                        <div className="mb-3 space-y-1 text-sm text-gray-600">
                            <p>📍 <strong>Destination:</strong> {item.destination}</p>
                            <p>📅 <strong>Dates:</strong> {item.startDate} → {item.endDate}</p>
                            <p className="flex items-center gap-2">
                                📌 <strong>Status:</strong>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold
          ${item.status === "PLANNING"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : item.status === "ACTIVE"
                                                ? "bg-green-100 text-green-800"
                                                : item.status === "COMPLETED"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-gray-100 text-gray-800"
                                        }
        `}>
                                    {item.status}
                                </span>
                            </p>
                        </div>

                        <div className="mt-4 border-t pt-4 text-sm text-gray-500">
                            <p>👤 <strong>Created by:</strong> {item.createdBy.name} ({item.createdBy.username})</p>
                            <p>📧 {item.createdBy.email}</p>
                            <p>📱 {item.createdBy.phoneNumber}</p>
                        </div>

                        {/* 🔘 Explore Button */}
                        <div className="mt-4 text-right">
                            <button
                                onClick={() => navigate(`/event/${item.id}`)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Explore
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
