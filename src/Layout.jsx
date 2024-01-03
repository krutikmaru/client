import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { useUser } from "./contexts/UserContext";
const Layout = ({ children }) => {
  const { user } = useUser();

  return (
    <>
      {user && <Navbar />}
      {children}
    </>
  );
};

export default Layout;
