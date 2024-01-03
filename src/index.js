import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import { BackpackProvider } from "./contexts/BackpackContext";
import { TshirtProvider } from "./contexts/TshirtContext";
import { CartProvider } from "./contexts/CartContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GoogleOAuthProvider clientId="126349152492-1jmjqc5occgb4lf08shiap4st75fosmr.apps.googleusercontent.com">
      <React.StrictMode>
        <BrowserRouter>
          <UserProvider>
            <CartProvider>
              <BackpackProvider>
                <TshirtProvider>
                  <App />
                </TshirtProvider>
              </BackpackProvider>
            </CartProvider>
          </UserProvider>
        </BrowserRouter>
      </React.StrictMode>
    </GoogleOAuthProvider>
  </>
);
