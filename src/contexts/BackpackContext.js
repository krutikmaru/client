import React, { createContext, useContext, useState } from "react";

const BackpackContext = createContext();

export const useBackpack = () => {
  const context = useContext(BackpackContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const BackpackProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [text, setText] = useState("Your name");
  const [textColor, setTextColor] = useState("#000");
  const [bagColor, setBagColor] = useState("#fff");
  function updateBackpack(_id, newText, newTextColor, newBagColor) {
    setId(_id);
    setText(newText);
    setTextColor(newTextColor);
    setBagColor(newBagColor);
  }
  function resetBackpackToDefault() {
    setId(null);
    setText("Your name");
    setTextColor("#000");
    setBagColor("#fff");
  }

  return (
    <BackpackContext.Provider
      value={{
        updateBackpack,
        resetBackpackToDefault,
        id,
        text,
        textColor,
        bagColor,
        setText,
        setTextColor,
        setBagColor,
      }}
    >
      {children}
    </BackpackContext.Provider>
  );
};
