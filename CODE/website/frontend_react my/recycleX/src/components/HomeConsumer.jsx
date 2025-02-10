import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConsumerHome = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubcategories, setLoadingSubcategories] = useState({});

  const consumerToken = localStorage.getItem("consumerToken");

  useEffect(() => {
    setLoadingCategories(true);
    axios
      .get("http://localhost:5000/common/getAllRecyclingCategories", {
        headers: { Authorization: `Bearer ${consumerToken}` },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error("Categories data is not an array", response.data);
          setCategories([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      })
      .finally(() => {
        setLoadingCategories(false);
      });
  }, [consumerToken]);

  const fetchSubcategories = (categoryId) => {
    if (!subcategories[categoryId] && !loadingSubcategories[categoryId]) {
      setLoadingSubcategories((prev) => ({
        ...prev,
        [categoryId]: true,
      }));
      axios
        .get(
          `http://localhost:5000/common/getAllRecyclingSubCategories/${categoryId}`,
          {
            headers: { Authorization: `Bearer ${consumerToken}` },
          }
        )
        .then((response) => {
          setSubcategories((prev) => ({
            ...prev,
            [categoryId]: response.data.data,
          }));
        })
        .catch((error) => console.error("Error fetching subcategories:", error))
        .finally(() => {
          setLoadingSubcategories((prev) => ({
            ...prev,
            [categoryId]: false,
          }));
        });
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm">
        <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
          <img src={logo} alt="RecycleX Logo" height="40" className="me-2" />
          RecycleX
        </a>
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/aboutus">
              About Us
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/services">
              Services
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/products">
              Products
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">
              Contact Us
            </a>
          </li>
        </ul>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={() => navigate("/addcartconsumer")}
          >
            Buy Products
          </button>
        </div>
      </nav>

      {/* Recycling Categories */}
      <div className="container mt-4">
        <h2 className="text-center mb-4">Main Recycling Categories</h2>
        <div className="row">
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : categories && categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.category_id} className="col-md-6 mb-4">
                <div className="card shadow-sm">
                  <img
                    src={
                      category.category_image ||
                      "https://via.placeholder.com/200"
                    }
                    className="card-img-top"
                    alt={category.category_name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 key={category.category_id} className="card-title">
                      {category.category_name}
                    </h5>
                    <button
                      className="btn btn-primary mb-2"
                      onClick={() => fetchSubcategories(category.category_id)}
                    >
                      {loadingSubcategories[category.category_id]
                        ? "Loading Subcategories..."
                        : "Show Subcategories"}
                    </button>
                    <div className="row">
                      {(subcategories[category.category_id] || []).map(
                        (sub) => (
                          <div key={sub.id} className="col-md-6 mb-2">
                            <button className="btn btn-outline-success w-100">
                              {sub.name}
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerHome;
