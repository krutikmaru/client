import React, { useEffect, useState } from "react";
import "./blob.css";
import { useUser } from "../../contexts/UserContext";
import { motion } from "framer-motion";
import products from "../../utils/displayProductsData";
import { useNavigate } from "react-router-dom";
import { useBackpack } from "../../contexts/BackpackContext";
import { useTshirt } from "../../contexts/TshirtContext";

import axios from "axios";
import UserLibrary from "./UserLibrary";

const Main = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [userLibrary, setUserLibrary] = useState([]);
  const { updateBackpack, resetBackpackToDefault } = useBackpack();
  const { updateTshirt, resetTshirtToDefault } = useTshirt();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/user-products/${user.username}`)
      .then((response) => {
        const data = response.data.map((item) => {
          if (item.data.type === "tshirt") {
            item.imageUrl = require("../../assets/product-images/TSHIRT.png");
          } else if (item.data.type === "backpack") {
            item.imageUrl = require("../../assets/product-images/BACKPACK.png");
          }
          return item;
        });
        console.log("User edit data:", data);
        setUserLibrary(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [user.username]);
  return (
    <>
      <div className="background-blob-top"></div>
      <div className="h-auto w-full bg-black-primary font-inter flex justify-start items-center flex-col px-20 mt-16">
        <div className="w-full h-full flex flex-col justify-evenly items-start relative z-40">
          <div className="font-inter w-full py-16 px-4 md:px-12 lg:px-24">
            <h1 className="text-5xl font-bold text-gray-400 mb-8">
              Welcome, <span className="text-white">{user.username} 👻</span>!
            </h1>
            <h1 className="text-4xl font-bold text-gray-400 mb-6 ml-2">
              Our Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product) => {
                let tailwindClass =
                  product.focusColor +
                  ` py-6 px-4 rounded-lg shadow-lg w-72 m-auto backdrop-blur-2xl bg-opacity-20 transition-all duration-500 ease-in-out hover:bg-opacity-5`;
                return (
                  <motion.div
                    key={product.id}
                    className={tailwindClass}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * product.id }}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-48 transition-all duration-200 ease-in-out hover:h-56 object-cover mb-4 rounded-md"
                    />
                    <h2 className="text-lg text-white font-semibold">
                      {product.title}
                    </h2>
                    <p className="text-gray-400 mb-2">{product.price}</p>
                    <button
                      onClick={() => {
                        if (product.navigationUrl === "/tshirt") {
                          resetTshirtToDefault();
                        } else if (product.navigationUrl === "/backpack") {
                          resetBackpackToDefault();
                        }
                        navigate(product.navigationUrl);
                      }}
                      className="bg-blue-button text-white px-6 py-1 mt-2 rounded-full"
                    >
                      Edit
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
          {userLibrary.length !== 0 && (
            <UserLibrary
              {...{ userLibrary, setUserLibrary, updateBackpack, updateTshirt }}
            />
          )}
        </div>
      </div>
      <div className="background-blob-bottom"></div>
    </>
  );
};

export default Main;
