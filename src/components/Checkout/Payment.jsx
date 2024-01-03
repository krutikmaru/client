import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useCart } from "../../contexts/CartContext";
import emailjs from "@emailjs/browser";

const Test = () => {
  const location = useLocation();
  const total = location.state.total;
  const [email, setEmail] = useState(""); // Added email state
  const [phone, setPhone] = useState(""); // Added email state
  const [address, setAddress] = useState(""); // Added email state
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPhoneEmpty, setIsPhoneEmpty] = useState(false);
  const [isAddressEmpty, setIsAddressEmpty] = useState(false);

  const { user } = useUser();
  const { setCart } = useCart();
  const form = useRef();
  const navigate = useNavigate();
  function getDate() {
    const date = new Date(new Date().toISOString());
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  const paymentSuccessHandler = (response) => {
    const paymentId = response.razorpay_payment_id;
    axios
      .post(`http://localhost:5000/api/order/create-order`, {
        username: user.username,
        email,
        phone,
        address,
        paymentid: paymentId,
        amount: total,
        date: getDate(),
      })
      .then((response) => {
        console.log(response.data);
        axios
          .post(`http://localhost:5000/api/users/clear-cart/${user.username}`)
          .then((response) => console.log(response.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    emailjs
      .sendForm(
        "service_8ch052n",
        "template_xpehhlb",
        form.current,
        "-AhYlUi0eQlrxiwsy"
      )
      .then(
        (result) => {
          console.log("Order confirmation mail sent: ", result.text);
        },
        (error) => {
          console.log("Order confirmation mail not sent: ", error.text);
        }
      );
    setCart([]);
    navigate("/");
    toast.success("Payment Successful", {
      duration: 5000,
    });
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    if (email === "") {
      setIsEmailEmpty(true);
      if (phone === "") {
        setIsPhoneEmpty(true);
        if (address === "") {
          setIsAddressEmpty(true);
          return;
        } else {
          setIsAddressEmpty(false);
        }
      } else {
        setIsPhoneEmpty(false);
      }
    } else {
      setIsEmailEmpty(false);
    }

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_10KnH6K3gICodQ", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: "USD",
      name: "Dropify",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dropify-d3d8f.appspot.com/o/glow%20(1).png?alt=media&token=28efb31a-81fb-4a6f-9cf8-9cbe3224ca87",
      description: "Payment for order #12568",
      handler: paymentSuccessHandler,
      prefill: {
        name: "Krutik Maru",
        email: email, // Use the email state here
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="mt-20 mx-40 pt-10">
      <h1 className="text-5xl mb-10  text-[#969696] font-semibold font-inter">
        Shipping Details
      </h1>
      <form ref={form}>
        <div className="mb-4">
          <div className="bg-red-00 w-[40%] flex justify-between items-start">
            <label htmlFor="email" className="text-gray-400">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="user_email"
              value={email}
              autoComplete="off"
              className="ml-5 mb-2 w-80 px-4 py-2 rounded-md bg-black-menu-item-hover outline-none border-none text-white font-inter"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)} // Handle email input
            />
          </div>
          <div className="bg-green-00 w-[40%] flex justify-between items-start">
            <label htmlFor="number" className="text-gray-400">
              Phone:
            </label>
            <input
              type="number"
              id="number"
              value={phone}
              autoComplete="off"
              name="user_phone"
              className="ml-5 mb-2 w-80 px-4 py-2 rounded-md bg-black-menu-item-hover outline-none border-none text-white font-inter"
              placeholder="Enter your phone"
              required
              onChange={(e) => setPhone(e.target.value)} // Handle email input
            />
          </div>
          <div className="bg-blue-00 w-[40%] flex justify-between items-start">
            <label htmlFor="address" className="text-gray-400">
              Address:
            </label>
            <textarea
              type="text"
              id="address"
              value={address}
              autoComplete="off"
              name="user_address"
              className="ml-5 mb-2 w-80 px-4 py-2 rounded-md bg-black-menu-item-hover outline-none border-none text-white font-inter"
              placeholder="Enter your address"
              required
              onChange={(e) => setAddress(e.target.value)} // Handle email input
            />
            <input className="hidden" value={total} name="user_amount" />
            <input className="hidden" value={user.username} name="user_name" />
          </div>
          {isEmailEmpty && (
            <>
              <span className="ml-16 text-red-500">Email is required</span>
              <br />
            </>
          )}
          {isPhoneEmpty && (
            <>
              <span className="ml-16 text-red-500">Phone is required</span>
              <br />
            </>
          )}
          {isAddressEmpty && (
            <>
              <span className="ml-16 text-red-500">Address is required</span>
              <br />
            </>
          )}
        </div>
        <button
          className="bg-blue-button py-2 px-4 rounded-md text-white"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            displayRazorpay(total * 100);
          }}
        >
          PAY ${total}
        </button>
      </form>
    </div>
  );
};

export default Test;

// 5267 3181 8797 5449
