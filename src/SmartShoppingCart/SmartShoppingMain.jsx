import HomePage from "./Pages/HomePage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import ProfilePage from "./Pages/ProfilePage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const ProfileContext = createContext();

const SmartShoppingMain = () => {
  const [profileDetails, setProfileDetails] = useState({
    name: "Faiyaz Ansari",
    email: "faiyaz.ansari@gmail.com",
    address: "Pune, Maharashtra, India",
  });

  return (
    <BrowserRouter>
      <ProfileContext.Provider value={profileDetails}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/CartPage" element={<CartPage />} />
          <Route
            path="/ProductDetailsPage/:productID"
            element={<ProductDetailsPage />}
          />
          <Route path="/CheckoutPage" element={<CheckoutPage />} />
          <Route
            path="/ProfilePage"
            element={<ProfilePage setProfileDetails={setProfileDetails} />}
          />
        </Routes>
      </ProfileContext.Provider>
    </BrowserRouter>
  );
};

export default SmartShoppingMain;
