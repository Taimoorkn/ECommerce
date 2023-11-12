import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu.jsx";
import HomePage from "./scenes/home/HomePage";
import Footer from "./scenes/global/Footer";
import LogIn from "./scenes/userAccount/LogIn";
import LogOut from "./scenes/userAccount/LogOut";
import SignUp from "./scenes/userAccount/SignUp";
import { Protector } from "./scenes/userAccount/Protector"; 
import User from "./scenes/userAccount/User";
import Header from "./scenes/global/Header";
import Confirmation from "./scenes/checkout/Confirmation";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Navbar />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/item/:itemId" element={<ItemDetails />} />
          <Route
            path="/checkout"
            element={<Protector Component={Checkout} />}
          />
          <Route path="/checkout/success" element={<Confirmation />} />
          <Route path="/user" element={<Protector Component={User} />} />
          <Route path="/login" element={<Protector Component={LogIn} />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/signup" element={<Protector Component={SignUp} />} />
        </Routes> 
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
