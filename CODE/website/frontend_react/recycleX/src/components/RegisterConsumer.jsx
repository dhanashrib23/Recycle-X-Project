import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.webp";

const RegisterConsumer = () => {
  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          {/* Consumer Login */}
          <div className="col-md-5 p-4 bg-white shadow rounded m-2">
            <h3 className="text-center mb-3">
              <img
                src={logo}
                alt="Consumer Logo"
                height="40"
                className="me-2"
              />
              Registration
            </h3>
            <form>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="First Name"
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Last Name"
                required
              />
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Mobile Number"
                required
              />
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Password"
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="State"
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="City"
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Pincode"
                required
              />
              <select className="form-control mb-3" required>
                <option>Consumer Type</option>
                <option>Company</option>
                <option>Organization</option>
                <option>Government</option>
                <option>Indiviual</option>
              </select>
              <button type="submit" className="btn btn-success w-100">
                Register
              </button>
            </form>
          </div>
        </div>

        {/* Sign Up link */}
        <div className="text-center mt-3">
          <p>
            Already Registered{" "}
            <a href="/loginconsumer" className="text-primary">
              Login Here!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterConsumer;
