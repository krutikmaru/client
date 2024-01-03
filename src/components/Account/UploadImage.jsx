import React from "react";
import { BarLoader } from "react-spinners";

const UploadImage = ({
  isUploading,
  imageUpload,
  handleImageUploadChange,
  handleUpload,
  setImageUpload,
}) => {
  return (
    <div className="mb-6">
      {isUploading ? (
        <BarLoader color="#0d99ff" />
      ) : !imageUpload ? (
        <>
          <input
            type="file"
            className="w-[0.1px] h-[0.1px] absolute opacity-0"
            id="file"
            onChange={handleImageUploadChange}
          />
          <label
            htmlFor="file"
            className="text-blue-button underline cursor-pointer font-inter text-xs px-3 py-2 rounded-md w-40"
          >
            Change image
          </label>
        </>
      ) : (
        <div>
          <button
            onClick={handleUpload}
            className="bg-blue-button cursor-pointer font-inter px-3 py-2 text-sm rounded-md w-20 text-white font-medium"
          >
            Update
          </button>
          <span
            className="text-red-600 ml-3 text-sm underline cursor-pointer"
            onClick={() => setImageUpload(null)}
          >
            Cancle
          </span>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
