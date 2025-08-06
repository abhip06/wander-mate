import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/events/${id}`);
                setEvent(res.data.data);
            } catch (err) {
                setError("Unable to fetch event details.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) return <div className="flex items-center justify-center h-screen text-gray-500 text-xl">Loading...</div>;
    if (error) return <div className="flex items-center justify-center h-screen text-red-500 text-xl">{error}</div>;
    if (!event) return <div className="flex items-center justify-center h-screen text-gray-500 text-xl">No event found.</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
            <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 transition-all duration-300 hover:shadow-purple-300">
                <h1 className="text-5xl font-bold text-purple-700 mb-6 tracking-tight">{event.eventName}</h1>

                <p className="text-gray-700 text-lg mb-8 leading-relaxed border-l-4 border-purple-300 pl-4 italic">
                    {event.description}
                </p>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Event Info */}
                    <div className="space-y-5">
                        <InfoItem label="📍 Destination" value={event.destination} />
                        <InfoItem label="📅 Start Date" value={event.startDate} />
                        <InfoItem label="📅 End Date" value={event.endDate} />
                        <InfoItem label="🏷️ Tag" value={event.tag} />
                        <div>
                            <span className="block text-sm font-semibold text-gray-600 mb-1">📌 Status</span>
                            <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold shadow-sm
                                ${event.status === "PLANNING"
                                    ? "bg-yellow-300 text-yellow-900"
                                    : event.status === "ACTIVE"
                                        ? "bg-green-300 text-green-900"
                                        : event.status === "COMPLETED"
                                            ? "bg-red-300 text-red-900"
                                            : "bg-gray-300 text-gray-900"}`}>
                                {event.status}
                            </span>
                        </div>
                    </div>

                    {/* Creator Info */}
                    <div className="space-y-5">
                        <InfoItem label="👤 Created By" value={`${event.createdBy.name} (${event.createdBy.username})`} />
                        <InfoItem label="📧 Email" value={event.createdBy.email} />
                        <InfoItem label="📱 Phone" value={event.createdBy.phoneNumber} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value }) => (
    <div>
        <span className="block text-sm font-semibold text-gray-600 mb-1">{label}</span>
        <span className="text-base text-gray-800">{value}</span>
    </div>
);

export default EventDetails;
