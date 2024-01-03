import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import UploadImage from "./UploadImage";
import Avatar from "./Avatar";
import DeleteAccount from "./DeleteAccount";
import { toast } from "react-hot-toast";

const Account = () => {
  const { user, setUser } = useUser();
  const [imageUpload, setImageUpload] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/order/user-orders/${user.username}`)
      .then((response) => {
        console.log(response.data);
        setOrderHistory(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleImageUploadChange = (event) => {
    const fileName = event.target.files[0].name.toLowerCase();
    const fileExtension = fileName.split(".").pop();
    console.log(fileName, fileExtension);
    if (
      fileExtension === "jpg" ||
      fileExtension === "png" ||
      fileExtension === "jpeg"
    ) {
      console.log("IN");
      setImageUpload(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    const imageRef = ref(storage, `profiles/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef).then((url) => {
        const data = { username: user.username, picture: url };
        axios
          .post("http://localhost:5000/api/users/update-picture", data)
          .then((response) => {
            console.log("SUCCESS. Backend response:", response.data);
            setUser(response.data);
            toast.success("Image updated", {
              duration: 5000,
            });
          })
          .catch((error) => {
            console.error("Error updating user picture on the backend:", error);
          })
          .finally(() => {
            setImageUpload(null);
            setIsUploading(false);
          });
      });
    });
  };
  return (
    <div className="h-screen w-full bg-black-primary font-inter flex justify-center items-center pt-20 px-20">
      <div className="h-full w-[30%] py-24 flex justify-start items-center flex-col bg-purple-00">
        <Avatar user={user} />
        <UploadImage
          {...{
            isUploading,
            imageUpload,
            handleImageUploadChange,
            handleUpload,
            setImageUpload,
          }}
        />
        <h1 className="text-4xl font-inter font-bold text-white">
          {user.given_name === "" ? user.username : user.given_name}
        </h1>
        <DeleteAccount
          {...{ deleteAccount, isDeleting, setDeleteAccount, setIsDeleting }}
        />
      </div>
      <div className="rounded-lg h-full w-[70%] pt-36 px-10 flex justify-center items-start">
        <div>
          <h1 className="text-6xl font-inter text-white font-bold">
            Order History 🛒
          </h1>
          <div className="text-2xl text-black-secondary">
            {orderHistory.length > 0 ? (
              <div className=" mt-4">
                <ul>
                  {orderHistory.map((order) => {
                    return (
                      <li>
                        <div className="mb-4 text-base px-6 py-4 text-gray-200 rounded-md bg-black-menu-item-hover">
                          <div className="mb-3">
                            <span className="text-gray-500 mr-4 ">
                              Pay amount
                            </span>{" "}
                            ${order.amount}
                          </div>
                          <div className="mb-3">
                            <span className="text-gray-500 mr-5 ">
                              Payment Id
                            </span>{" "}
                            {order._id}
                          </div>
                          <div>
                            <span className="text-gray-500 mr-6 ">
                              Order date
                            </span>{" "}
                            {order.date}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <h1>You currently have no order history 🙅🏼‍♂️</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
