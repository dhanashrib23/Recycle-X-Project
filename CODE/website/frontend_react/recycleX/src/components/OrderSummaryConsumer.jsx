import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";

const categoriesWithPrices = {
  Plastic: 10,
  Metal: 20,
  Glass: 15,
  Paper: 5,
};

const OrderSummaryConsumer = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const [address, setAddress] = useState("123 Street, City, Country");
  const [newAddress, setNewAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleChangeAddress = () => {
    if (newAddress.trim() !== "") {
      setAddress(newAddress);
      setIsEditing(false);
    }
  };

  const handlePlaceOrder = () => {
    //alert("Your order has been placed successfully!");
    navigate("/placeorderConsumer"); // Navigate to PlaceOrder page
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + categoriesWithPrices[item.category] * item.quantity,
    0
  );

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm">
        <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
          <img src={logo} alt="RecycleX Logo" height="40" className="me-2" />
          RecycleX
        </a>
      </nav>

      {/* Order Summary */}
      <div className="container mt-4">
        <h2 className="text-center">Order Summary</h2>
        <div className="card p-4 shadow-sm">
          <h5>Delivery Address</h5>
          {isEditing ? (
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleChangeAddress}>
                Save
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-between">
              <p>{address}</p>
              <button
                className="btn btn-outline-primary"
                onClick={() => setIsEditing(true)}
              >
                Change Address
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order Table */}
      <div className="container mt-4">
        {cart.length > 0 && (
          <div className="card p-4 shadow-sm">
            <h4>Your Orders</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Main Category</th>
                  <th>Sub Category</th>
                  <th>Quantity (kg)</th>
                  <th>Price per kg ($)</th>
                  <th>Total Price ($)</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.category}</td>
                    <td>{item.subCategory}</td>
                    <td>{item.quantity}</td>
                    <td>${categoriesWithPrices[item.category]}</td>
                    <td>
                      ${categoriesWithPrices[item.category] * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4 className="text-end">Total Price: ${totalPrice}</h4>

            {/* Place Order Button */}
            <div className="text-center mt-4">
              <button
                className="btn btn-success px-5"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummaryConsumer;
