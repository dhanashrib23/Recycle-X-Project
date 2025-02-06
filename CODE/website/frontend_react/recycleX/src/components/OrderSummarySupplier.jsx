// import "bootstrap/dist/css/bootstrap.min.css";
// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import logo from "../assets/logo.webp";
// import { useNavigate } from "react-router-dom";

// const categoriesWithPrices = {
//   Plastic: 10,
//   Metal: 20,
//   Glass: 15,
//   Paper: 5,
// };

// const OrderSummarySupplier = () => {
//   const location = useLocation();
//   const cart = location.state?.cart || [];
//   const [address, setAddress] = useState("123 Street, City, Country");
//   const [newAddress, setNewAddress] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();

//   const handleChangeAddress = () => {
//     if (newAddress.trim() !== "") {
//       setAddress(newAddress);
//       setIsEditing(false);
//     }
//   };

//   const handlePlaceOrder = () => {
//     //alert("Your order has been placed successfully!");
//     navigate("/placeordersupplier"); // Navigate to PlaceOrder page
//   };

//   const totalPrice = cart.reduce(
//     (acc, item) => acc + categoriesWithPrices[item.category] * item.quantity,
//     0
//   );

//   return (
//     <div>
//       {/* Navigation Bar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm">
//         <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
//           <img src={logo} alt="RecycleX Logo" height="40" className="me-2" />
//           RecycleX
//         </a>
//       </nav>

//       {/* Order Summary */}
//       <div className="container mt-4">
//         <h2 className="text-center">Order Summary</h2>
//         <div className="card p-4 shadow-sm">
//           <h5>Delivery Address</h5>
//           {isEditing ? (
//             <div className="d-flex">
//               <input
//                 type="text"
//                 className="form-control me-2"
//                 value={newAddress}
//                 onChange={(e) => setNewAddress(e.target.value)}
//               />
//               <button className="btn btn-primary" onClick={handleChangeAddress}>
//                 Save
//               </button>
//             </div>
//           ) : (
//             <div className="d-flex justify-content-between">
//               <p>{address}</p>
//               <button
//                 className="btn btn-outline-primary"
//                 onClick={() => setIsEditing(true)}
//               >
//                 Change Address
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Order Table */}
//       <div className="container mt-4">
//         {cart.length > 0 && (
//           <div className="card p-4 shadow-sm">
//             <h4>Your Orders</h4>
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>Main Category</th>
//                   <th>Sub Category</th>
//                   <th>Quantity (kg)</th>
//                   <th>Price per kg ($)</th>
//                   <th>Total Price ($)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cart.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.category}</td>
//                     <td>{item.subCategory}</td>
//                     <td>{item.quantity}</td>
//                     <td>${categoriesWithPrices[item.category]}</td>
//                     <td>
//                       ${categoriesWithPrices[item.category] * item.quantity}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <h4 className="text-end">Total Price: ${totalPrice}</h4>

//             {/* Place Order Button */}
//             <div className="text-center mt-4">
//               <button
//                 className="btn btn-success px-5"
//                 onClick={handlePlaceOrder}
//               >
//                 Place Order
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderSummarySupplier;

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.webp";

const categoriesWithPrices = {
  Plastic: 10,
  Metal: 20,
  Glass: 15,
  Paper: 5,
};

const OrderSummarySupplier = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("123 Street, City, Country");
  const [newAddress, setNewAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("supplierToken");

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/supplier/showcart",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Cart API Response:", response.data); // Debugging log

      if (Array.isArray(response.data)) {
        setCart(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCart([]); // Prevent crash
    }
  };

  const handleChangeAddress = () => {
    if (newAddress.trim() !== "") {
      setAddress(newAddress);
      setIsEditing(false);
    }
  };

  const handlePlaceOrder = () => {
    navigate("/placeordersupplier");
  };

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + (categoriesWithPrices[item.category_name] || 0) * item.quantity_kg,
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
        {cart.length > 0 ? (
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
                    <td>{item.category_name}</td>
                    <td>{item.subcategory_name}</td>
                    <td>{item.quantity_kg}</td>
                    <td>${categoriesWithPrices[item.category_name] || 0}</td>
                    <td>
                      $
                      {(categoriesWithPrices[item.category_name] || 0) *
                        item.quantity_kg}
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
        ) : (
          <h4 className="text-center">Your cart is empty.</h4>
        )}
      </div>
    </div>
  );
};

export default OrderSummarySupplier;
