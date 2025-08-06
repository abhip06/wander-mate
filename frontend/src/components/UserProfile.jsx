import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-md overflow-hidden p-6 border border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar || "https://via.placeholder.com/80"}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.location || "Location not set"}</p>
            <p className="text-sm text-blue-600">{user.interests?.join(", ") || "No interests added"}</p>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-700 space-y-1">
          <p><span className="font-medium">Gender:</span> {user.gender}</p>
          <p><span className="font-medium">DOB:</span> {user.dateOfBirth}</p>
          <p><span className="font-medium">Phone:</span> {user.phoneNumber}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
        </div>

        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
