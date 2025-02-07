import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/Login";
import LoginSupplier from "./components/LoginSupplier";
import LoginConsumer from "./components/LoginConsumer";
import RegisterSupplier from "./components/RegisterSupplier";
import RegisterConsumer from "./components/RegisterConsumer";
import SupplierHome from "./components/HomeSupplier";
import ConsumerHome from "./components/HomeConsumer";
import OrderSummarySupplier from "./components/orderSummarySupplier";
import AddCartConsumer from "./components/AddCartConsumer";
import AddCartSupplier from "./components/AddCartSupplier";
import OrderSummaryConsumer from "./components/OrderSummaryConsumer";
import PlaceOrderSupplier from "./components/PlaceOrderSupplier";
import PlaceOrderConsumer from "./components/PlaceOrderConsumer";
import AboutUs from "./components/AboutUs";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loginsupplier" element={<LoginSupplier />} />
        <Route path="/loginconsumer" element={<LoginConsumer />} />
        <Route path="/registersupplier" element={<RegisterSupplier />} />
        <Route path="/registerconsumer" element={<RegisterConsumer />} />
        <Route path="/supplierhome" element={<SupplierHome />} />
        <Route path="/consumerhome" element={<ConsumerHome />} />
        <Route path="/addcartsupplier" element={<AddCartSupplier />} />
        <Route path="/addcartconsumer" element={<AddCartConsumer />} />

        <Route
          path="/ordersummarysupplier"
          element={<OrderSummarySupplier />}
        />
        <Route
          path="/ordersummaryconsumer"
          element={<OrderSummaryConsumer />}
        />
        <Route path="/placeordersupplier" element={<PlaceOrderSupplier />} />
        <Route path="/placeorderConsumer" element={<PlaceOrderConsumer />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App;
