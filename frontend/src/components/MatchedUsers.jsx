import React from "react";

const MatchedUsers = ({ users }) => {
  if (!users?.length) return <p>No matched users found.</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-blue-600 mb-4">Matched Users</h3>
      <ul className="space-y-3">
        {users.map((user, idx) => (
          <li key={idx} className="flex items-center gap-3 border-b pb-2">
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchedUsers;
