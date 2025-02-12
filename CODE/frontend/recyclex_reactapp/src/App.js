import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserTypeSelection from "./components/UserTypeSelection";
import SupplierLogin from "./components/supplier/SupplierLogin";
import ConsumerLogin from "./components/consumer/ConsumerLogin";
import SupplierRegistration from "./components/supplier/SupplierRegister";
import ConsumerRegister from "./components/consumer/ConsumerRegister";
import OtpVerification from "./components/consumer/OtpVerification";
import SupplierHomePage from "./components/supplier/SupplierHomePage";
import AboutUsPage from "./components/AboutUsPage";
import SupplierProfile from "./components/supplier/SupplierProfile";
import ContactPage from "./components/ContactPage";
import SupplierCart from "./components/supplier/SupplierCart";
import SupplierOrderSummary from "./components/supplier/SupplierOrderSummary";
import OrderSuccess from "./components/OrderSuccess";
import ConsumerHomePage from "./components/consumer/ConsumerHomePage";
import ConsumerProfile from "./components/consumer/ConsumerProfile";
import ConsumerCart from "./components/consumer/ConsumerCart";
import ConsumerOrderSummary from "./components/consumer/ConsumerOrderSummary";
import AddTrashCategories from "./components/admin/AddTrashCategories";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTypeSelection />} />
        <Route path="/supplier/login" element={<SupplierLogin />} />
        <Route path="/supplier/register" element={<SupplierRegistration />} /> 
        <Route path="/supplier/dashboard" element={<SupplierHomePage />} />
        <Route path="/supplier/profile" element={<SupplierProfile />} />
        <Route path="/supplier/cart" element={<SupplierCart />} />
        <Route path="/supplier/summary" element={<SupplierOrderSummary />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/consumer/login" element={<ConsumerLogin />} />
        <Route path="/consumer/register" element={<ConsumerRegister />} />
        <Route path="/consumer/dashboard" element={<ConsumerHomePage />} />
        <Route path="/consumer/profile" element={<ConsumerProfile />} />
        <Route path="/consumer/cart" element={<ConsumerCart />} />
        <Route path="/consumer/summary" element={<ConsumerOrderSummary />} />
        <Route path="/consumer/otp-verification" element={<OtpVerification />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminHomePage />} />
        <Route
          path="/admin/addTrashCategory"
          element={<AddTrashCategories />}
        />
        <Route
          path="/admin/addRecyclingCategories"
          element={<AddRecyclingCategories />}
        />
        <Route
          path="/admin/getAllYearlyTrash"
          element={<GetAllYearlyTrashCategories />}
        />
        <Route
          path="/admin/getAllYearlyProduct"
          element={<GetAllYearlyRecyclingCategories />}
        />
        <Route
          path="/admin/supplier/:supplierId"
          element={<SupplierDetails />}
        />
        <Route
          path="/admin/consumer/:consumerId"
          element={<ConsumerDetails />}
        />
      </Routes>
    </Router>
  );
};

export default App;