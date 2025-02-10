import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.webp";

const AddCartSupplier = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const token = localStorage.getItem("supplierToken");

  useEffect(() => {
    fetchCartItems();
    fetchAllTrashCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchAllTrashSubcategories(selectedCategory);
    } else {
      setSubCategories([]);
      setSelectedSubCategory("");
    }
  }, [selectedCategory]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/supplier/showcart",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartItems(response.data || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchAllTrashCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/common/getAllTrashCategories",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(
        Array.isArray(response.data.data) ? response.data.data : []
      );
    } catch (error) {
      console.error("Error fetching trash categories:", error);
      setCategories([]);
    }
  };

  const fetchAllTrashSubcategories = async (categoryId) => {
    if (!categoryId) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/common/getAllTrashSubCategoriesbycatid/${categoryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const subCategoryData = response.data.data;
      setSubCategories(Array.isArray(subCategoryData) ? subCategoryData : []);
    } catch (error) {
      console.error("Error fetching trash subcategories:", error);
      setSubCategories([]);
    }
  };

  const addToCart = async () => {
    if (!selectedSubCategory || quantity <= 0) {
      alert("Please select a subcategory and enter a valid quantity.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/supplier/addcart/${selectedSubCategory}`,
        {
          subcategory_id: selectedSubCategory,
          quantity_kg: quantity,
          price_per_kg: selectedPrice,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Item added to cart successfully!");
      fetchCartItems();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:5000/supplier/removecart/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCartItems();
    } catch (error) {
      console.error("Error removing from cart:", error);
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
          {["Home", "About Us", "Services", "Products", "Contact"].map(
            (page, index) => (
              <li key={index} className="nav-item">
                <a
                  className="nav-link"
                  href={`/${page.toLowerCase().replace(" ", "")}`}
                >
                  {page}
                </a>
              </li>
            )
          )}
        </ul>
        <button
          className="btn btn-success"
          onClick={() =>
            navigate("/ordersummarysupplier", { state: { cartItems } })
          }
        >
          Order Summary
        </button>
      </nav>

      <div className="container mt-4">
        <h2 className="text-center">Add Scrap to Cart</h2>
        <div className="card p-4 shadow-sm">
          <div className="mb-3">
            <label className="form-label">Main Category</label>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <div className="mb-3">
              <label className="form-label">Sub Category</label>
              <select
                className="form-select"
                value={selectedSubCategory}
                onChange={(e) => {
                  const subcategoryId = e.target.value;
                  setSelectedSubCategory(subcategoryId);

                  const subcategory = subCategories.find(
                    (sub) => sub.subcategory_id === subcategoryId
                  );
                  setSelectedPrice(subcategory ? subcategory.price_per_kg : 0);
                }}
              >
                <option value="">Select Sub Category</option>
                {subCategories.map((sub) => (
                  <option key={sub.subcategory_id} value={sub.subcategory_id}>
                    {sub.subcategory_name} (₹{sub.price_per_kg}/kg)
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Quantity (kg)</label>
            <input
              type="text"
              className="form-control no-spinner"
              value={quantity || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setQuantity(value);
                }
              }}
              inputMode="numeric"
            />
          </div>

          <button
            className="btn btn-success w-100"
            onClick={addToCart}
            disabled={!selectedSubCategory || quantity <= 0}
          >
            Add to Cart
          </button>
        </div>

        {cartItems.length > 0 && (
          <div className="card p-4 shadow-sm mt-4">
            <h4 className="mb-3">Scrap Cart</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Main Category</th>
                  <th>Sub Category</th>
                  <th>Quantity (kg)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.item_id}>
                    <td>{item.category_name}</td>
                    <td>{item.subcategory_name}</td>
                    <td>{item.quantity_kg}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.item_id)}
                      >
                        Remove
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

export default AddCartSupplier;
