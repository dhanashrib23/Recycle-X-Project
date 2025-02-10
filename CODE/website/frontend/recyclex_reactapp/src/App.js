import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Import routing components
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import AdminHomePage from "./pages/AdminHomePage";
import SupplierDetails from "./pages/SupplierDetails";
import ConsumerDetails from "./pages/ConsumerDetails";
import AddTrashCategories from "./pages/AddTrashCategories";
import AddRecyclingCategories from "./pages/AddRecyclingCategories";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminHomePage />} />
        <Route path="/admin/addTrashCategory" element={<AddTrashCategories/>}/>
        <Route path="/admin/addRecyclingCategories" element={<AddRecyclingCategories/>}/>
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
