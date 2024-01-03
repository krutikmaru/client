import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faMinus,
  faPlus,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import { useCart } from "../../contexts/CartContext";

const UserLibrary = ({
  userLibrary,
  setUserLibrary,
  updateBackpack,
  updateTshirt,
}) => {
  const navigate = useNavigate();
  // const [cart, setCart] = useState([]);
  const { user } = useUser();
  const { cart, setCart } = useCart();
  const toggleCartItem = (productId, productType) => {
    if (cart.some((item) => item.id === productId)) {
      axios
        .post("http://localhost:5000/api/users/remove-from-cart", {
          username: user.username,
          itemId: productId,
        })
        .then((response) => {
          setCart(cart.filter((item) => item.id !== productId));
          console.log(response.data);
        })
        .catch((err) => console.log(err));
    } else {
      let price;
      if (productType === "tshirt") {
        price = 7.99;
      } else if (productType === "backpack") {
        price = 12.99;
      }
      axios
        .post("http://localhost:5000/api/users/add-to-cart", {
          username: user.username,
          cartItem: { type: productType, id: productId, price }, // Set the price as needed
        })
        .then((response) => {
          setCart([...cart, { type: productType, id: productId, price }]);
          console.log(response.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const deleteProduct = async (type, id) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/api/${
          type === "tshirt" ? "tshirt" : "backpack"
        }/${type === "tshirt" ? "delete-tshirt" : "delete-backpack"}/${id}`
      );
      const updatedLibrary = userLibrary.filter(
        (product) => product._id !== id
      );
      setUserLibrary(updatedLibrary);
      console.log(result.data);

      axios
        .post("http://localhost:5000/api/users/remove-from-cart", {
          username: user.username,
          itemId: id,
        })
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <div className="font-inter w-full py-16 px-4 md:px-12 lg:px-24">
      <h1 className="text-4xl font-bold text-gray-400 mb-6 ml-2">Your work</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {userLibrary.map((product, index) => {
          let tailwindClass =
            product.focusColor +
            ` py-6 px-4 rounded-lg shadow-lg w-72 m-auto backdrop-blur-2xl bg-opacity-20 transition-all duration-500 ease-in-out hover:bg-opacity-5`;
          return (
            <motion.div
              key={index}
              className={tailwindClass}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.1 * (product.index + 1),
              }}
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
              <p className="text-gray-400 mb-2">{product.data.created}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    if (product.data.type === "backpack") {
                      updateBackpack(
                        product._id,
                        product.data.text,
                        product.data.textColor,
                        product.data.bagColor
                      );
                    } else if (product.data.type === "tshirt") {
                      updateTshirt(
                        product._id,
                        product.data.tshirtColor,
                        product.data.image
                      );
                    }
                    navigate(product.navigationUrl);
                  }}
                  className="bg-blue-button text-white px-6 py-1 mt-2 rounded-full"
                >
                  Edit
                </button>
                <div className="w-[100px] flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (product.data.type === "tshirt") {
                        deleteProduct("tshirt", product._id);
                      } else if (product.data.type === "backpack") {
                        deleteProduct("backpack", product._id);
                      }
                    }}
                    className="bg-red-500  px-4 py-1 mt-2 rounded-full"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} color="#fff" />
                  </button>
                  <button
                    onClick={() => {
                      toggleCartItem(product._id, product.data.type);
                    }}
                    className={`bg-blue-button text-white px-4 py-1 mt-2 rounded-full`}
                  >
                    <FontAwesomeIcon
                      icon={
                        cart.some((item) => item.id === product._id)
                          ? faMinus
                          : faCartPlus
                      }
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UserLibrary;
