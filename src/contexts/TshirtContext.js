import React, { createContext, useContext, useState } from "react";

const TshirtContext = createContext();

export const useTshirt = () => {
  const context = useContext(TshirtContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const TshirtProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [tshirtColor, setTshirtColor] = useState("#fff");
  const [uploadedImage, setUploadedImage] = useState("./logo.png");
  function updateTshirt(_id, newTshirtColor, newUploadedImage) {
    setId(_id);
    setTshirtColor(newTshirtColor);
    setUploadedImage(newUploadedImage);
  }
  function resetTshirtToDefault() {
    setId(null);
    setTshirtColor("#fff");
    setUploadedImage("./logo.png");
  }

  return (
    <TshirtContext.Provider
      value={{
        updateTshirt,
        resetTshirtToDefault,
        tshirtColor,
        uploadedImage,
        setTshirtColor,
        setUploadedImage,
        id,
      }}
    >
      {children}
    </TshirtContext.Provider>
  );
};
