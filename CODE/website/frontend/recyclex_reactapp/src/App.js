import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import AdminHomePage from "./pages/AdminHomePage";
import SupplierDetails from "./pages/SupplierDetails";
import ConsumerDetails from "./pages/ConsumerDetails";
import AddTrashCategories from "./pages/AddTrashCategories";
import AddRecyclingCategories from "./pages/AddRecyclingCategories";
import GetAllYearlyTrashCategories from "./pages/GetAllYearlyTrashCategories";
import GetAllYearlyRecyclingCategories from "./pages/GetAllYearlyRecyclingCategories";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
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
