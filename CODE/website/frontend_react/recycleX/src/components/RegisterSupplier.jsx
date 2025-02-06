// import "bootstrap/dist/css/bootstrap.min.css";
// import logo from "../assets/logo.webp";

// const RegisterSupplier = () => {
//   return (
//     <div
//       className="min-vh-100 d-flex justify-content-center align-items-center"
//       style={{ backgroundColor: "#f8f9fa" }}
//     >
//       <div className="container">
//         <div className="row justify-content-center">
//           {/* Supplier Login */}
//           <div className="col-md-5 p-4 bg-white shadow rounded m-2">
//             <h3 className="text-center mb-3">
//               <img
//                 src={logo}
//                 alt="Supplier Logo"
//                 height="40"
//                 className="me-2"
//               />
//               Registration
//             </h3>
//             <form>
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="First Name"
//                 required
//               />
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Last Name"
//                 required
//               />
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Mobile Number"
//                 required
//               />
//               <input
//                 type="password"
//                 className="form-control mb-2"
//                 placeholder="Password"
//                 required
//               />
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="State"
//                 required
//               />
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="City"
//                 required
//               />
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Pincode"
//                 required
//               />
//               <select className="form-control mb-3" required>
//                 <option>Supplier Type</option>
//                 <option>Company</option>
//                 <option>Organization</option>
//                 <option>Government</option>
//                 <option>Indiviual</option>
//               </select>
//               <button type="submit" className="btn btn-success w-100">
//                 Register
//               </button>
//             </form>
//           </div>

//           {/* Sign Up link */}
//           <div className="text-center mt-3">
//             <p>
//               Already Registered{" "}
//               <a href="/loginsupplier" className="text-primary">
//                 Login Here!
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterSupplier;

import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.webp";

const RegisterSupplier = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
    state: "",
    city: "",
    pincode: "",
    supplierType: "Company",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/supplier/signup",
        formData
      );
      setSuccess(response.data.message);
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          {/* Supplier Registration Form */}
          <div className="col-md-5 p-4 bg-white shadow rounded m-2">
            <h3 className="text-center mb-3">
              <img
                src={logo}
                alt="Supplier Logo"
                height="40"
                className="me-2"
              />
              Registration
            </h3>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
              <select
                className="form-control mb-3"
                name="supplierType"
                value={formData.supplierType}
                onChange={handleChange}
                required
              >
                <option>Supplier Type</option>
                <option>Company</option>
                <option>Organization</option>
                <option>Government</option>
                <option>Individual</option>
              </select>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>

          {/* Sign Up link */}
          <div className="text-center mt-3">
            <p>
              Already Registered{" "}
              <a href="/loginsupplier" className="text-primary">
                Login Here!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSupplier;
