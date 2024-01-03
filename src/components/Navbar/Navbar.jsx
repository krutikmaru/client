import React, { useState } from "react";
import { motion } from "framer-motion";
import { googleLogout } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import {
  faCartShopping,
  faPhone,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user, setUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const handleLogout = () => {
    setUser(null);
    googleLogout();
  };
  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };
  return (
    <nav className="flex items-center justify-between px-4 py-8 h-14 bg-black-navbar absolute top-0 left-0 z-50 w-full">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => handleNavigate("/")}
      >
        <img
          src={require("../../assets/logo.png")}
          alt="Logo"
          className="w-20 object-cover"
        />
      </div>

      <div className="flex items-center relative">
        <div
          onClick={handleMenuToggle}
          className="h-10 w-10 border-2 border-[#0d5] rounded-full overflow-hidden bg-gray-600 flex items-center justify-center cursor-pointer hover:border-blue-button ease-in-out duration-500 transition-all"
        >
          <img
            src={user.picture}
            alt={user.username}
            className="w-full h-full object-cover"
          />
        </div>
        {isMenuOpen && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: isMenuOpen ? 0 : -10, opacity: isMenuOpen ? 1 : 0 }}
            className={`absolute right-2 overflow-hidden top-12 mt-2 bg-black-navbar rounded-lg shadow-lg p-2 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul>
              <li
                className="px-4 py-2 flex justify-start items-center text-black-menu-item-text hover:bg-black-menu-item-hover hover:text-blue-button transition-all ease-in-out duration-500 cursor-pointer rounded-md mb-2"
                onClick={() => handleNavigate("/account")}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-md mr-3 text-black-menu-item-text"
                />{" "}
                <span>Account</span>
              </li>
              <li
                className="flex justify-start items-center px-4 py-2 text-black-menu-item-text hover:bg-black-menu-item-hover hover:text-blue-button transition-all ease-in-out duration-500 cursor-pointer rounded-md mb-2"
                onClick={() => handleNavigate("/support")}
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-md mr-3 text-black-menu-item-text"
                />{" "}
                <span>Support</span>
              </li>
              <li
                className="flex justify-start items-center px-4 py-2 text-black-menu-item-text hover:bg-black-menu-item-hover hover:text-blue-button transition-all ease-in-out duration-500 cursor-pointer rounded-md mb-2"
                onClick={() => handleNavigate("/checkout")}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-md mr-3 text-black-menu-item-text"
                />{" "}
                <span>Checkout</span>
              </li>
              <li
                onClick={handleLogout}
                className="flex justify-start items-center px-4 py-2 text-red-400 hover:bg-black-menu-item-hover  transition-all ease-in-out duration-500 cursor-pointer rounded-md"
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="text-md mr-3"
                />{" "}
                <span>Logout</span>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
