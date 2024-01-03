import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Support = () => {
  const [isSending, setIsSending] = useState(false);
  const form = useRef();
  const navigate = useNavigate();
  const sendEmail = () => {
    setIsSending(true);
    emailjs
      .sendForm(
        "service_8ch052n",
        "template_mzbbmmd",
        form.current,
        "-AhYlUi0eQlrxiwsy"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Sent");
          navigate("/");
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };
  return (
    <>
      <div className="background-blob-top"></div>
      <div className="min-h-screen w-full bg-black-primary font-inter flex justify-evenly items-center pt-20 px-20 flex-col">
        {!isSending ? (
          <form className=" w-96 bg-fuchsia-00 flex flex-col" ref={form}>
            <h1 className="text-4xl font-inter font-bold text-white mr-auto mb-10">
              Talk to us 🫡
            </h1>
            <input
              type="text"
              name="user_name"
              placeholder="Your name"
              required
              className="h-10 w-full mb-4 bg-[#202124] rounded-md text-[#dbeaed] text-[17px] border-2 border-[#202124] transition ease-in-out duration-500 outline-none p-3 focus:border-blue-button"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your email"
              required
              className="h-10 w-full mb-4 bg-[#202124] rounded-md text-[#dbeaed] text-[17px] border-2 border-[#202124] transition ease-in-out duration-500 outline-none p-3 focus:border-blue-button"
            />
            <textarea
              name="message"
              placeholder="Send us your message"
              required
              className=" w-full mb-4 bg-[#202124] rounded-md text-[#dbeaed] text-[17px] border-2 border-[#202124] transition ease-in-out duration-500 outline-none p-3 focus:border-blue-button"
            />
            <button
              type="submit"
              onClick={sendEmail}
              value="Send"
              className="bg-blue-button font-inter text-white px-5 py-2 rounded-md w-40 cursor-pointer m-auto"
            >
              Send 🚀
            </button>
          </form>
        ) : (
          <div className=" flex flex-col justify-center items-center">
            <h1 className="text-4xl font-inter font-bold text-white mb-10">
              We're sending in your query...👻
            </h1>
            <BarLoader color="#0d99ff" />
          </div>
        )}
      </div>
      <div className="background-blob-bottom"></div>
    </>
  );
};

export default Support;
