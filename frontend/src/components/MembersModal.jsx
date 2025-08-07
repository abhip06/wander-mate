import React, { useEffect } from "react";

const MembersModal = ({ members, onClose }) => {
  useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll when modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Event Members</h2>
        <ul className="space-y-2 max-h-80 overflow-y-auto">
          {members?.length > 0 ? (
            members.map((member, idx) => (
              <li
                key={idx}
                className="p-3 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                {member.name || member.email}
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-center">No members joined yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MembersModal;
