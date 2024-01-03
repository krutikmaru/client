import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTshirt } from "../contexts/TshirtContext";

const ActionButtons = ({ type, data }) => {
  const { resetTshirtToDefault } = useTshirt();
  const navigate = useNavigate();
  function handleSave() {
    if (type === "tshirt") {
      axios
        .post("http://localhost:5000/api/tshirt/save-tshirt", data)
        .then((response) => {
          console.log(response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (type === "backpack") {
      axios
        .post("http://localhost:5000/api/backpack/save-backpack", data)
        .then((response) => {
          console.log(response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  return (
    <div className="w-[180px] h-14 bg-red-00 fixed bottom-10 right-10 flex justify-evenly items-center">
      <button
        onClick={() => navigate("/")}
        className="font-inter font-semibold underline px-5 py-2 rounded-md "
      >
        Back
      </button>
      <button
        onClick={handleSave}
        className="bg-blue-button font-inter text-white px-5 py-2 rounded-md "
      >
        Save
      </button>
    </div>
  );
};

export default ActionButtons;
