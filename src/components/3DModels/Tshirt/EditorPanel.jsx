import React, { useState } from "react";
import { ChromePicker } from "react-color";

const EditorPanel = ({ tshirtColor, setTshirtColor, handleImageUpload }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  if (isMinimized) {
    return (
      <div className="absolute w-96 h-[50px] bg-black-primary z-50 top-40 left-10 rounded-lg font-inter">
        <span className="absolute left-5 top-[50%] translate-y-[-50%] text-lg font-medium cursor-pointer text-white">
          Editor panel
        </span>
        <span
          onClick={() => setIsMinimized(false)}
          className="absolute right-5 top-2 text-2xl font-bold text-blue-button cursor-pointer"
        >
          +
        </span>
      </div>
    );
  } else {
    return (
      <div className="absolute font-inter w-96 h-[500px] bg-black-primary z-50 top-40 left-10 rounded-lg px-5 py-14 overflow-y-scroll">
        <span className="absolute left-5 top-3 text-lg font-medium cursor-pointer text-white">
          Editor panel
        </span>
        <span
          onClick={() => setIsMinimized(true)}
          className="absolute right-5 top-0 text-4xl text-blue-button  font-medium cursor-pointer"
        >
          -
        </span>

        <div className="mt-4 flex flex-col items-center bg-black-navbar p-2 rounded-md">
          <span className="text-lg font-medium mb-2 mr-auto text-white">
            Tshirt Color:
          </span>
          <ChromePicker
            color={tshirtColor}
            onChange={(color) => setTshirtColor(color.hex)}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          className="mt-4 text-white"
        />
      </div>
    );
  }
};

export default EditorPanel;
