// import "bootstrap/dist/css/bootstrap.min.css";
// import man from "../assets/man.png";
// import { useNavigate } from "react-router-dom";
// import LoginConsumerBGImg from "../assets/LoginConsumerBGImg.jpg";

// const LoginConsumer = () => {
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
//           {/* Consumer Login */}
//           <div className="col-md-5 p-4 bg-white shadow rounded m-2 text-center">
//             {/* Logo */}
//             <img src={man} alt="Consumer Logo" height="80" className="mb-3" />

//             {/* Login Heading */}
//             <h1 className="mb-3">Consumer Login</h1>

//             {/* Subtext */}
//             <h6 className="mb-3">Hey, Enter your details to sign in!</h6>

//             {/* Login Form */}
//             <form className="mt-5">
//               <input
//                 type="email"
//                 className="form-control mb-2"
//                 placeholder="Email"
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
//                 onClick={() => navigate("/consumerhome")}
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

//         {/* Sign Up link */}
//       </div>
//     </div>
//   );
// };

// export default LoginConsumer;

import "bootstrap/dist/css/bootstrap.min.css";
import man from "../assets/man.png";
import { useNavigate } from "react-router-dom";
import LoginConsumerBGImg from "../assets/LoginConsumerBGImg.jpg";
import { useState } from "react";
import axios from "axios";

const LoginConsumer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/consumer/signin",
        {
          email,
          password,
        }
      );

      // Store the token securely in localStorage
      localStorage.setItem("consumerToken", response.data.token);

      // Navigate to consumer home page after login
      navigate("/consumerhome");
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
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          {/* Consumer Login */}
          <div className="col-md-5 p-4 bg-white shadow rounded m-2 text-center">
            {/* Logo */}
            <img src={man} alt="Consumer Logo" height="80" className="mb-3" />

            {/* Login Heading */}
            <h1 className="mb-3">Consumer Login</h1>

            {/* Subtext */}
            <h6 className="mb-3">Hey, Enter your details to sign in!</h6>

            {/* Login Form */}
            <form className="mt-5" onSubmit={handleLogin}>
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  <a href="/registerconsumer" className="text-primary">
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

export default LoginConsumer;
