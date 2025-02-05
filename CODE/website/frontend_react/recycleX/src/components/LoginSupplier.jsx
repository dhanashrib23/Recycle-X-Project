// import "bootstrap/dist/css/bootstrap.min.css";
// import man from "../assets/man.png"; // Assuming a relevant icon for supplier login
// import { useNavigate } from "react-router-dom";
// import LoginConsumerBGImg from "../assets/LoginConsumerBGImg.jpg"; // Keeping the same background

// const LoginSupplier = () => {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="min-vh-100 d-flex justify-content-center align-items-center"
//       style={{
//         backgroundImage: `url(${LoginConsumerBGImg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundColor: "#f8f9fa",
//       }}
//     >
//       <div className="container">
//         <div className="row justify-content-center">
//           {/* Supplier Login */}
//           <div className="col-md-5 p-4 bg-white shadow rounded m-2 text-center">
//             {/* Logo */}
//             <img src={man} alt="Supplier Logo" height="80" className="mb-3" />

//             {/* Login Heading */}
//             <h1 className="mb-3">Supplier Login</h1>

//             {/* Subtext */}
//             <h6 className="mb-3">Hey, Enter your details to sign in!</h6>

//             {/* Login Form */}
//             <form className="mt-5">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Mobile Number"
//                 required
//               />
//               <input
//                 type="password"
//                 className="form-control mb-2 mt-3"
//                 placeholder="Password"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="btn btn-success w-100 mt-4"
//                 onClick={() => navigate("/supplierhome")}
//               >
//                 Login
//               </button>
//               <div className="text-center mt-3">
//                 <p>
//                   Don't have an account?{" "}
//                   <a href="/signup" className="text-primary">
//                     Sign up!
//                   </a>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSupplier;

// import "bootstrap/dist/css/bootstrap.min.css";
// import man from "../assets/man.png"; // Assuming a relevant icon for supplier login
// import { useNavigate } from "react-router-dom";
// import LoginConsumerBGImg from "../assets/LoginConsumerBGImg.jpg"; // Keeping the same background
// import { useState } from "react";
// import axios from "axios";

// const LoginSupplier = () => {
//   const navigate = useNavigate();

//   // State to manage form data
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   // Handler for form submission
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/supplier/signin",
//         {
//           mobileNumber,
//           password,
//         }
//       );

//       // Save the token to localStorage or state
//       localStorage.setItem("supplierToken", response.data.token);

//       // Navigate to supplier home page
//       navigate("/supplierhome");
//     } catch (error) {
//       setErrorMessage(
//         error.response?.data?.message || "An error occurred. Please try again."
//       );
//     }
//   };

//   return (
//     <div
//       className="min-vh-100 d-flex justify-content-center align-items-center"
//       style={{
//         backgroundImage: `url(${LoginConsumerBGImg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundColor: "#f8f9fa",
//       }}
//     >
//       <div className="container">
//         <div className="row justify-content-center">
//           {/* Supplier Login */}
//           <div className="col-md-5 p-4 bg-white shadow rounded m-2 text-center">
//             {/* Logo */}
//             <img src={man} alt="Supplier Logo" height="80" className="mb-3" />

//             {/* Login Heading */}
//             <h1 className="mb-3">Supplier Login</h1>

//             {/* Subtext */}
//             <h6 className="mb-3">Hey, Enter your details to sign in!</h6>

//             {/* Login Form */}
//             <form className="mt-5" onSubmit={handleLogin}>
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Mobile Number"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 required
//               />
//               <input
//                 type="password"
//                 className="form-control mb-2 mt-3"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               {errorMessage && <p className="text-danger">{errorMessage}</p>}
//               <button type="submit" className="btn btn-success w-100 mt-4">
//                 Login
//               </button>
//               <div className="text-center mt-3">
//                 <p>
//                   Don't have an account?{" "}
//                   <a href="/signup" className="text-primary">
//                     Sign up!
//                   </a>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSupplier;

import "bootstrap/dist/css/bootstrap.min.css";
import man from "../assets/man.png";
import { useNavigate } from "react-router-dom";
import LoginConsumerBGImg from "../assets/LoginConsumerBGImg.jpg";
import { useState } from "react";
import axios from "axios";

const LoginSupplier = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/supplier/signin",
        {
          mobileNumber,
          password,
        }
      );

      // Store the token securely
      localStorage.setItem("supplierToken", response.data.token);

      // Navigate to supplier home page after login
      navigate("/supplierhome");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Invalid credentials, try again."
      );
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${LoginConsumerBGImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 p-4 bg-white shadow rounded text-center">
            <img src={man} alt="Supplier Logo" height="80" className="mb-3" />
            <h1 className="mb-3">Supplier Login</h1>
            <h6 className="mb-3">Enter your details to sign in!</h6>

            <form className="mt-4" onSubmit={handleLogin}>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control mb-2 mt-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <button type="submit" className="btn btn-success w-100 mt-4">
                Login
              </button>
              <div className="text-center mt-3">
                <p>
                  Don't have an account?{" "}
                  <a href="/signup" className="text-primary">
                    Sign up!
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSupplier;
