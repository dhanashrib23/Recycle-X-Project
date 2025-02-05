// import "bootstrap/dist/css/bootstrap.min.css";
// import { useState } from "react";
// import logo from "../assets/logo.webp";
// import plasticImg from "../assets/plastic.jpg";
// import ironImg from "../assets/metal.jpg";
// import glassImg from "../assets/glass.jpg";
// import paperImg from "../assets/paper.jpg";
// import { useNavigate } from "react-router-dom";

// const categories = [
//   {
//     name: "Plastic",
//     image: plasticImg,
//     subcategories: ["Soft Plastic", "Hard Plastic", "Polyester", "Polythene"],
//   },
//   {
//     name: "Iron",
//     image: ironImg,
//     subcategories: ["Cast Iron", "Wrought Iron", "Scrap Metal", "Steel"],
//   },
//   {
//     name: "Glass",
//     image: glassImg,
//     subcategories: [
//       "Clear Glass",
//       "Colored Glass",
//       "Fiberglass",
//       "Tempered Glass",
//     ],
//   },
//   {
//     name: "Paper",
//     image: paperImg,
//     subcategories: ["Newspaper", "Cardboard", "Magazines", "Office Paper"],
//   },
// ];

// const SupplierHome = () => {
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState("");

//   return (
//     <div>
//       {/* Navigation Bar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm">
//         <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
//           <img src={logo} alt="RecycleX Logo" height="40" className="me-2" />
//           RecycleX
//         </a>
//         <ul className="navbar-nav mx-auto">
//           <li className="nav-item">
//             <a className="nav-link" href="/">
//               Home
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/about">
//               About Us
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/services">
//               Services
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/products">
//               Products
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/contact">
//               Contact Us
//             </a>
//           </li>
//         </ul>
//         <div className="d-flex">
//           <input
//             type="text"
//             className="form-control me-2"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button
//             className="btn btn-success"
//             onClick={() => navigate("/addcartsupplier")}
//           >
//             Sell Scrap
//           </button>
//         </div>
//       </nav>

//       {/* Waste Categories */}
//       <div className="container mt-4">
//         <h2 className="text-center mb-4">Main Waste Categories</h2>
//         <div className="row">
//           {categories.map((category, index) => (
//             <div key={index} className="col-md-6 mb-4">
//               <div className="card shadow-sm">
//                 <img
//                   src={category.image}
//                   className="card-img-top"
//                   alt={category.name}
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{category.name}</h5>
//                   <div className="row">
//                     {category.subcategories.map((sub, subIndex) => (
//                       <div key={subIndex} className="col-md-6 mb-2">
//                         <button className="btn btn-outline-success w-100">
//                           {sub}
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupplierHome;

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SupplierHome = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubcategories, setLoadingSubcategories] = useState({});

  const supplierToken = localStorage.getItem("supplierToken");

  useEffect(() => {
    // Fetch main categories
    setLoadingCategories(true);
    axios
      .get("http://localhost:5000/common/getAllTrashCategories", {
        headers: { Authorization: `Bearer ${supplierToken}` },
      })
      .then((response) => {
        // Check if response.data is an object and contains a 'data' field that's an array
        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data); // Set categories to the array in 'data'
        } else {
          console.error("Categories data is not an array", response.data);
          setCategories([]); // fallback to an empty array
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]); // In case of error, fallback to empty array
      })
      .finally(() => {
        setLoadingCategories(false); // Stop loading
      });
  }, [supplierToken]);

  const fetchSubcategories = (categoryId) => {
    if (!subcategories[categoryId] && !loadingSubcategories[categoryId]) {
      setLoadingSubcategories((prev) => ({
        ...prev,
        [categoryId]: true,
      }));
      axios
        .get(
          `http://localhost:5000/common/getAllTrashSubCategories/${categoryId}`,
          {
            headers: { Authorization: `Bearer ${supplierToken}` },
          }
        )
        .then((response) => {
          setSubcategories((prev) => ({
            ...prev,
            [categoryId]: response.data,
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
            onClick={() => navigate("/addcartsupplier")}
          >
            Sell Scrap
          </button>
        </div>
      </nav>

      {/* Waste Categories */}
      <div className="container mt-4">
        <h2 className="text-center mb-4">Main Waste Categories</h2>
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
                    <h5 className="card-title">{category.category_name}</h5>
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

export default SupplierHome;
