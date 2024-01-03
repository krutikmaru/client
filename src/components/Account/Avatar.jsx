import React from "react";

const Avatar = ({ user }) => {
  return (
    <div className="w-44 h-44 mb-4 rounded-full overflow-hidden border-2 border-[#0d5]">
      <img
        src={user.picture}
        alt={user.username}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Avatar;
