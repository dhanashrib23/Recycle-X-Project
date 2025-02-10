import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderSuccess from "../assets/OrderSuccess.gif";

const PlaceOrderSupplier = () => {
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate generating a unique order ID
    setOrderId(Math.floor(Math.random() * 1000000));
  }, []);

  return (
    <div className="container mt-10 text-center">
      {/* Confirmation GIF with adjusted size */}
      <img
        src={OrderSuccess}
        alt="Order Confirmed"
        className="img-fluid mb-4"
        style={{ width: "60%", maxWidth: "400px" }} // Adjusted GIF size
      />

      {/* Order Tracking Information */}
      <h3>Your Order has been placed successfully!</h3>
      <p>
        Your order ID is: <strong>{orderId}</strong>
      </p>
      <p>
        Order Tracking: <strong>Shipped</strong>
      </p>
      <p>
        Expected Delivery: <strong>2-5 business days</strong>
      </p>

      {/* Recycled Nature Information */}
      <div className="mt-4">
        <h5>Thank you for supporting the environment!</h5>
        <p>
          By choosing to RecycleX, you help reduce waste, save energy, and
          conserve natural resources. Recycling plays a key role in protecting
          the planet and creating a sustainable future.
        </p>
      </div>

      {/* Button to Go Back or Continue */}
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default PlaceOrderSupplier;
