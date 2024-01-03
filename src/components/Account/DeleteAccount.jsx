import React from "react";
import { BarLoader } from "react-spinners";
import { useUser } from "../../contexts/UserContext";
import axios from "axios";

const DeleteAccount = ({
  deleteAccount,
  isDeleting,
  setDeleteAccount,
  setIsDeleting,
}) => {
  const { user, setUser } = useUser();

  const handleDeleteUser = () => {
    setIsDeleting(true);
    const data = { username: user.username };
    axios
      .post("http://localhost:5000/api/users/delete-user", data)
      .then((response) => {
        console.log("User deleted:", response.data);
        setUser(null);
        setIsDeleting(false);
        setDeleteAccount(false);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };
  return (
    <div className="mt-16">
      {isDeleting ? (
        <BarLoader color="#DC2626" />
      ) : (
        <>
          {!deleteAccount && (
            <button
              onClick={() => setDeleteAccount(true)}
              className="bg-red-500 cursor-pointer font-inter px-2 py-2 text-sm rounded-md w-36 text-white font-medium "
            >
              Delete account ⚠️
            </button>
          )}
          {deleteAccount && (
            <>
              <span className="text-black-menu-item-text mr-3">
                Are you sure?
              </span>
              <button
                onClick={handleDeleteUser}
                className="bg-red-600 cursor-pointer font-inter px-2 py-2 text-sm rounded-md w-16 text-white font-medium hover:bg-red-500 transition-all ease-in-out duration-300"
              >
                Yes
              </button>
              <span
                onClick={() => setDeleteAccount(false)}
                className="text-black-secondary hover:text-blue-button transition-all ease-in-out duration-300 underline cursor-pointer font-inter text-sm px-3 py-2 rounded-md w-40"
              >
                Cancle
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DeleteAccount;
