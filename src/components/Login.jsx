import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
function Login() {
  const { setUser } = useUser();
  // If user click back after login
  setUser(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [notValid, setNotValid] = useState(false);
  const navigate = useNavigate();

  function handleGoogleSuccess(response) {
    var decoded = jwt_decode(response.credential);
    console.log(decoded);
    let user = {
      username: `${decoded.given_name}-${decoded.family_name}-google`,
      password: decoded.sub,
      given_name: decoded.given_name,
      picture: decoded.picture,
      created: new Date().toISOString(),
      products: [],
    };
    axios
      .post("http://localhost:5000/api/auth/login", user)
      .then((response) => {
        console.log("User info sent to the backend:", response.data);
        setUser(response.data);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Error sending user info to the backend:", error);
      });
  }
  function handleError(error) {
    console.log(error);
  }
  function handleApplicationLogin() {
    if (username === "" || password === "") {
      setNotValid(true);
      return;
    }
    // reset state if there are any previous state nodification
    setNotValid(false);
    let user = {
      username: username.trim(),
      password: password,
      given_name: "",
      picture:
        "https://firebasestorage.googleapis.com/v0/b/dropify-d3d8f.appspot.com/o/profiles%2Fuser-default.png?alt=media&token=b1571140-2e72-429c-83e4-8b7655902014",
      created: new Date().toISOString(),
      products: [],
    };
    console.log(user);
    axios
      .post("http://localhost:5000/api/auth/login", user)
      .then((response) => {
        console.log("User info sent to the backend:", response.data);
        setUser(response.data);
        setInvalidPassword(false);
        setPassword("");
        toast.success("Logged in", {
          duration: 5000,
        });
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Error sending user info to the backend:", error);
        setInvalidPassword(true);
      });
  }

  return (
    <>
      <div className="h-screen w-ful bg-black-primary  flex justify-center items-center flex-col">
        <img
          src={require("../assets/logo.png")}
          alt="Dropify"
          className="w-28"
        />
        <div className="w-[16rem] h-52  flex flex-col justify-evenly items-center">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-10 w-full bg-[#202124] rounded-md text-[#dbeaed] text-[17px] border-2 border-[#202124] transition ease-in-out duration-500 outline-none p-3 focus:border-blue-button"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="h-10 w-full bg-[#202124] rounded-md text-[#dbeaed] text-[17px] border-2 border-[#202124] transition ease-in-out duration-500 outline-none p-3 focus:border-blue-button"
            placeholder="Password"
          />
          <button
            onClick={handleApplicationLogin}
            className="bg-blue-button font-inter text-white px-5 py-2 rounded-md w-40 "
          >
            Take me in 👉🏼
          </button>
          {invalidPassword && (
            <span className="text-sm text-red-600">Invalid password</span>
          )}
          {notValid && (
            <span className="text-sm text-red-600">fields can't be empty</span>
          )}
        </div>
        <p className="text-[#202124] font-inter mb-4">OR</p>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleError}
          theme="filled_black"
          size="large"
        />
      </div>
    </>
  );
}

export default Login;
