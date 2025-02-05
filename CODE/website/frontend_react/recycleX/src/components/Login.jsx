import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import LoginBG from "../assets/LoginBG.jpg";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="position-relative min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${LoginBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          {/* Supplier Login */}
          <div
            className="col-md-5 p-4 shadow rounded m-3 text-center"
            style={{ backgroundColor: "#fff9db" }} // Faint Yellow
          >
            <div className="d-flex justify-content-center mb-3">
              <img src={logo} alt="Supplier Logo" height="80" />
            </div>
            <h3 className="mb-3">Login as Supplier</h3>
            <button
              type="button"
              className="btn btn-success w-100 mb-2"
              onClick={() => navigate("/loginsupplier")}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-outline-success w-100"
              onClick={() => navigate("/registersupplier")}
            >
              Click Here to Signup
            </button>
          </div>

          {/* Consumer Login */}
          <div
            className="col-md-5 p-4 shadow rounded m-3 text-center"
            style={{ backgroundColor: "#fff9db" }} // Faint Yellow
          >
            <div className="d-flex justify-content-center mb-3">
              <img src={logo} alt="Consumer Logo" height="80" />
            </div>
            <h3 className="mb-3">Login as Consumer</h3>
            <button
              type="button"
              className="btn btn-success w-100 mb-2"
              onClick={() => navigate("/loginconsumer")}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-outline-success w-100"
              onClick={() => navigate("/registerconsumer")}
            >
              Click Here to Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
