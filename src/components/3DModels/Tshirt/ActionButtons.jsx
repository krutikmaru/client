import React from "react";

const ActionButtons = () => {
  return (
    <div className="w-[200px] h-14 bg-red-00 fixed bottom-10 right-10 flex justify-evenly items-center">
      <button className="font-inter font-semibold underline px-5 py-2 rounded-md ">
        Back
      </button>
      <button className="bg-blue-button font-inter text-white px-5 py-2 rounded-md ">
        Save
      </button>
    </div>
  );
};

export default ActionButtons;
