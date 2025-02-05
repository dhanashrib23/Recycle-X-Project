import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import logo from "../assets/logo.webp";
import plasticImg from "../assets/plasticProduct.jpg";
import ironImg from "../assets/metalProduct.jpg";
import glassImg from "../assets/glassProduct.jpg";
import paperImg from "../assets/paperProduct.jpg";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Plastic",
    image: plasticImg,
    subcategories: ["Soft Plastic", "Hard Plastic", "Polyester", "Polythene"],
  },
  {
    name: "Iron",
    image: ironImg,
    subcategories: ["Cast Iron", "Wrought Iron", "Scrap Metal", "Steel"],
  },
  {
    name: "Glass",
    image: glassImg,
    subcategories: [
      "Clear Glass",
      "Colored Glass",
      "Fiberglass",
      "Tempered Glass",
    ],
  },
  {
    name: "Paper",
    image: paperImg,
    subcategories: ["Newspaper", "Cardboard", "Magazines", "Office Paper"],
  },
];

const ConsumerHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      {/* Navigation Bar */}
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
            <a className="nav-link" href="/about">
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

      {/* Product Categories */}
      <div className="container mt-4">
        <h2 className="text-center mb-4">Main Recycled Product Categories</h2>
        <div className="row">
          {categories.map((category, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <img
                  src={category.image}
                  className="card-img-top"
                  alt={category.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                  <div className="row">
                    {category.subcategories.map((sub, subIndex) => (
                      <div key={subIndex} className="col-md-6 mb-2">
                        <button className="btn btn-outline-success w-100">
                          {sub}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumerHome;

// Suggested Recycled Products:
// Plastic: Recycled plastic bottles, synthetic fabric (from PET), eco-friendly bags.
// Iron: Recycled steel beams, car parts, iron fences.
// Glass: Recycled glass tiles, glass bottles, decorative glass pieces.
// Paper: Recycled notebooks, biodegradable packaging, eco-friendly tissues.
