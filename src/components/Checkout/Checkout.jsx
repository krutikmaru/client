import React from "react";
import axios from "axios";
import { useCart } from "../../contexts/CartContext";
import { useUser } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, setCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const titles = {
    tshirt: "Plain T-Shirt",
    backpack: "Backpack",
  };
  const displayColors = {
    tshirt: "bg-display-pink",
    backpack: "bg-display-green",
  };

  const removeFromCart = (productId) => {
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
  };

  // Calculate the total price of items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <div className="background-blob-top"></div>

      <div className="min-h-screen w-full bg-black-primary font-inter pt-28 px-20">
        <div className="w-full h-full">
          {cart.length > 0 && (
            <h1 className="text-4xl font-bold text-gray-400 mb-6">Checkout</h1>
          )}

          {/* Check if cart is empty */}
          {cart.length === 0 ? (
            <div className="flex flex-col bg-red-00 items-center justify-center h-[500px]">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-4xl mb-4 text-blue-button"
              />
              <p className="text-gray-400 text-xl">Your cart is empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cart.map((item) => {
                let tailwindClass =
                  displayColors[item.type] +
                  ` backdrop-blur-2xl bg-opacity-10 rounded-lg overflow-hidden shadow-lg`;
                return (
                  <div key={item.id} className={tailwindClass}>
                    <img
                      src={
                        item.type === "tshirt"
                          ? require("../../assets/product-images/TSHIRT.png")
                          : require("../../assets/product-images/BACKPACK.png")
                      }
                      alt={item.type}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg text-white font-semibold">
                        {titles[item.type]}
                      </h2>
                      <p className="text-gray-500">${item.price}</p>
                      <button
                        className="bg-red-500 text-sm text-white px-4 py-1 mt-4 rounded-full"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="background-blob-bottom"></div>

      {/* Floating bar for total and proceed to payment */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black-primary text-white p-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium">
                <span className="text-gray-500 text-lg">Total: </span>$
                {calculateTotal()}
              </h2>
              <button
                onClick={() =>
                  navigate("/payment", { state: { total: calculateTotal() } })
                }
                className="bg-blue-button text-white px-6 py-2 rounded-full"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
