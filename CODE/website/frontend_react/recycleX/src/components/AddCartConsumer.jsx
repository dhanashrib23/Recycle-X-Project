import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import plasticImg from "../assets/plasticProduct.jpg";
import ironImg from "../assets/metalProduct.jpg";
import glassImg from "../assets/glassProduct.jpg";
import paperImg from "../assets/paperProduct.jpg";

// Product categories and subcategories
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

const AddCartConsumer = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cart, setCart] = useState([]);

  const handleAddToCart = () => {
    if (selectedCategory && selectedSubCategory && quantity > 0) {
      setCart([
        ...cart,
        {
          category: selectedCategory,
          subCategory: selectedSubCategory,
          quantity,
        },
      ]);
      setSelectedCategory("");
      setSelectedSubCategory("");
      setQuantity("");
    }
  };

  const handleDelete = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

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
          <button
            className="btn btn-success"
            onClick={() =>
              navigate("/ordersummaryconsumer", { state: { cart } })
            }
          >
            Order Summary
          </button>
        </div>
      </nav>

      {/* Form Section for Adding to Cart */}
      <div className="container mt-4">
        <h2 className="text-center">Add Product to Cart</h2>
        <div className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Sub Category</label>
            <select
              className="form-select"
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              disabled={!selectedCategory}
            >
              <option value="">Select Sub Category</option>
              {selectedCategory &&
                categories
                  .find((cat) => cat.name === selectedCategory)
                  .subcategories.map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity (kg)</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <button className="btn btn-success w-100" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Cart Table */}
      <div className="container mt-4">
        {cart.length > 0 && (
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Shopping Cart</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Quantity (kg)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.category}</td>
                    <td>{item.subCategory}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCartConsumer;
