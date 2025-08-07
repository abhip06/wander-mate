import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../Api";
import { useNavigate } from "react-router-dom";

// Reusable Info block
const Info = ({ label, value }) => (
    <div>
        <p className="text-sm font-semibold text-gray-500">{label}</p>
        <p className="text-base font-medium">{value}</p>
    </div>
);

const EventCard = ({ event }) => (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 transition hover:shadow-lg">
        <h3 className="text-lg font-semibold text-purple-800 mb-1">{event.eventName}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
        <div className="mt-2 text-sm text-gray-500">
            <p>📍 {event.destination}</p>
            <p>🗓️ {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
            <p>👤 Created by: {event.createdBy?.name}</p>
        </div>
    </div>
);

const Profile = () => {
    const userData = useSelector((state) => state.auth.userData?.data);
    const authStatus = useSelector((state) => state.auth.status);

    const [profile, setProfile] = useState(null);
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (!authStatus) {
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const [profileRes, eventsRes] = await Promise.all([
                    axios.get(`/api/v1/users/${userData?.id}`),
                    axios.get(`/api/v1/users/${userData?.id}/joined-events`),
                ]);
                setProfile(profileRes.data.data);
                setJoinedEvents(eventsRes.data.data || []);

                console.log(profileRes.data.data);
            } catch (err) {
                console.error("Error fetching profile or joined events", err);
            } finally {
                setLoading(false);
            }
        };

        if (userData?.id) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [userData]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500 text-xl">
                Loading profile...
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex items-center justify-center h-screen flex-col text-center">
                <h2 className="text-2xl font-semibold text-gray-800">No user data found</h2>
                <p className="text-gray-600 mt-2">Please login to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Avatar */}
                    <div className="shrink-0">
                        <img
                            src={
                                profile.avatarUrl ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || "User")}`
                            }
                            alt="Avatar"
                            className="w-40 h-40 rounded-full border-4 border-purple-300 object-cover shadow-md"
                        />
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-1">{profile.name}</h1>
                        <p className="text-sm text-gray-500 mb-4">@{profile.username}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-700">
                            <Info label="📧 Email" value={profile.email} />
                            <Info label="📱 Phone" value={profile.phoneNumber} />
                            <Info label="👤 Gender" value={profile.gender} />
                            <Info label="🎂 DOB" value={profile.dateOfBirth} />
                        </div>

                        {/* Interests */}
                        {profile.interests?.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">🎯 Interests</h3>
                                <ul className="flex flex-wrap gap-2">
                                    {profile.interests.map((interest, i) => (
                                        <li
                                            key={i}
                                            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                                        >
                                            {interest}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Joined Events Section */}
                {joinedEvents.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎉 Events You've Joined</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {joinedEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
