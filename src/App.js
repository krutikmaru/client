import Login from "./components/Login";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import { useUser } from "./contexts/UserContext";
import Main from "./components/Home/Main";
import Account from "./components/Account/Account";
import Support from "./components/Support/Support";
import Tshirt from "./components/3DModels/Tshirt/Tshirt";
import Backpack from "./components/3DModels/Backpack/Backpack";
import Checkout from "./components/Checkout/Checkout";
import Payment from "./components/Checkout/Payment";
import { Toaster } from "react-hot-toast";

function App() {
  const { user } = useUser();
  return (
    <Layout>
      <Toaster />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Main />} />
            <Route path="/account" element={<Account />} />
            <Route path="/support" element={<Support />} />
            <Route path="/tshirt" element={<Tshirt />} />
            <Route path="/backpack" element={<Backpack />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/tshirt" element={<Navigate to="/login" replace />} />
            <Route path="/account" element={<Navigate to="/login" replace />} />
            <Route
              path="/checkout"
              element={<Navigate to="/login" replace />}
            />
            <Route
              path="/backpack"
              element={<Navigate to="/login" replace />}
            />
            <Route path="/support" element={<Navigate to="/login" replace />} />
            <Route path="/payment" element={<Navigate to="/login" replace />} />
          </>
        )}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
