import React, { useState } from "react";
import { ChromePicker } from "react-color";

const EditorPanel = ({
  text,
  setText,
  textColor,
  setTextColor,
  bagColor,
  setBagColor,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  if (isMinimized) {
    return (
      <div className="absolute w-96 h-[50px] bg-black-primary z-50 top-20 left-10 rounded-lg font-inter">
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
      <div className="absolute font-inter w-96 h-[500px] bg-black-primary z-50 top-20 left-10 rounded-lg px-5 py-14 overflow-y-scroll">
        <span className="absolute left-5 top-3 text-lg font-medium cursor-pointer text-white">
          Editor panel
        </span>
        <span
          onClick={() => setIsMinimized(true)}
          className="absolute right-5 top-0 text-4xl text-blue-button  font-medium cursor-pointer"
        >
          -
        </span>
        <input
          value={text}
          onChange={(e) => {
            if (e.target.value.length <= 15) setText(e.target.value);
          }}
          className="h-10 w-full bg-black-navbar rounded-md font-medium text-white text-[17px] transition ease-in-out duration-500 outline-none p-3 focus:border-blue-button"
          placeholder="Enter your text here"
        />
        <div className="mt-4 flex flex-col bg-black-navbar p-2 rounded-md">
          <span className="text-lg font-medium mb-2 mr-auto text-white">
            Text Color:
          </span>
          <ChromePicker
            color={textColor}
            onChange={(color) => setTextColor(color.hex)}
          />
        </div>
        <div className="mt-4 flex flex-col bg-black-navbar p-2 rounded-md">
          <span className="text-lg font-medium mb-2 mr-auto text-white">
            Bag Color:
          </span>
          <ChromePicker
            color={bagColor}
            onChange={(color) => setBagColor(color.hex)}
          />
        </div>
      </div>
    );
  }
};

export default EditorPanel;
