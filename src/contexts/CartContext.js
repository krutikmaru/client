import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  const { user } = useUser();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/user-cart/${user.username}`)
      .then((response) =>
        console.log("Fecthed from custom hook: ", response.data)
      )
      .catch((err) => console.log(err));
  }, []);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
