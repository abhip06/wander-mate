import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div className="max-w-sm w-full bg-white rounded-2xl shadow-md overflow-hidden p-6 border border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar || "https://via.placeholder.com/80"}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.location}</p>
          <p className="text-sm text-blue-600">{user.interests?.join(", ")}</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <p><span className="font-medium">Gender:</span> {user.gender}</p>
        <p><span className="font-medium">DOB:</span> {user.dateOfBirth}</p>
        <p><span className="font-medium">Phone:</span> {user.phoneNumber}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
