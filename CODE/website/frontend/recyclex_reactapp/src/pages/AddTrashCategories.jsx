// import React, { useState, useEffect } from "react";
// import styles from "../styles/AddTrashCategories.module.css"; // Correctly import CSS module

// const AddTrashCategories = () => {
//   const [categoryForm, setCategoryForm] = useState({
//     categoryName: "",
//     categoryDescription: "",
//     categoryImage: null,
//   });

//   const [subcategoryForm, setSubcategoryForm] = useState({
//     categoryId: "",
//     pricePerKg: "",
//     subcategoryImage: null,
//   });

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/common/getAllTrashCategories"
//       );
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/common/getAllTrashSubCategoriesByCatId/${categoryId}`
//       );
//       const data = await response.json();
//       setSubcategories(data);
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//     }
//   };

//   const handleCategoryChange = (e) => {
//     const { name, value, files } = e.target;
//     setCategoryForm((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubcategoryChange = (e) => {
//     const { name, value, files } = e.target;
//     setSubcategoryForm((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleCategorySubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("categoryName", categoryForm.categoryName);
//     formData.append("categoryDescription", categoryForm.categoryDescription);
//     if (categoryForm.categoryImage) {
//       formData.append("categoryImage", categoryForm.categoryImage);
//     }

//     try {
//       const response = await fetch(
//         "http://localhost:8080/admin/supplier/addTrashCategory",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         fetchCategories();
//         setCategoryForm({
//           categoryName: "",
//           categoryDescription: "",
//           categoryImage: null,
//         });
//       } else {
//         console.error("Failed to add category");
//       }
//     } catch (error) {
//       console.error("Error adding category:", error);
//     }
//   };

//   const handleSubcategorySubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("categoryId", subcategoryForm.categoryId);
//     formData.append("pricePerKg", subcategoryForm.pricePerKg);
//     if (subcategoryForm.subcategoryImage) {
//       formData.append("subcategoryImage", subcategoryForm.subcategoryImage);
//     }

//     try {
//       const response = await fetch(
//         "http://localhost:8080/admin/supplier/addTrashSubcategory",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         fetchSubcategories(subcategoryForm.categoryId);
//         setSubcategoryForm({
//           categoryId: "",
//           pricePerKg: "",
//           subcategoryImage: null,
//         });
//       } else {
//         console.error("Failed to add subcategory");
//       }
//     } catch (error) {
//       console.error("Error adding subcategory:", error);
//     }
//   };

//   return (
//     <div className={styles["trash-categories-container"]}>
//       {/* Category Form */}
//       <section className={styles["category-section"]}>
//         <div className={styles["section-header"]}>
//           <h2>Add Trash Category</h2>
//         </div>
//         <form
//           onSubmit={handleCategorySubmit}
//           className={styles["category-form"]}
//         >
//           <div className={styles["form-group"]}>
//             <label>Category Name</label>
//             <input
//               className={styles["form-input"]}
//               name="categoryName"
//               value={categoryForm.categoryName}
//               onChange={handleCategoryChange}
//               required
//             />
//           </div>
//           <div className={styles["form-group"]}>
//             <label>Category Description</label>
//             <input
//               className={styles["form-input"]}
//               name="categoryDescription"
//               value={categoryForm.categoryDescription}
//               onChange={handleCategoryChange}
//               required
//             />
//           </div>
//           <div className={`${styles["form-group"]} ${styles["file-input"]}`}>
//             <label>Category Image</label>
//             <input
//               type="file"
//               name="categoryImage"
//               onChange={handleCategoryChange}
//               accept="image/*"
//             />
//           </div>
//           <button
//             type="submit"
//             className={`${styles.btn} ${styles["btn-primary"]}`}
//           >
//             Add Category
//           </button>
//         </form>
//       </section>

//       {/* Categories Table */}
//       <section className={styles["category-section"]}>
//         <div className={styles["section-header"]}>
//           <h2>Trash Categories</h2>
//         </div>
//         <table className={styles["data-table"]}>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((category) => (
//               <tr key={category.id}>
//                 <td>{category.id}</td>
//                 <td>{category.categoryName}</td>
//                 <td>{category.categoryDescription}</td>
//                 <td>
//                   <button
//                     className={`${styles.btn} ${styles["btn-secondary"]}`}
//                     onClick={() => fetchSubcategories(category.id)}
//                   >
//                     View Subcategories
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       {/* Subcategory Form */}
//       <section className={styles["subcategory-section"]}>
//         <div className={styles["section-header"]}>
//           <h2>Add Trash Subcategory</h2>
//         </div>
//         <form
//           onSubmit={handleSubcategorySubmit}
//           className={styles["subcategory-form"]}
//         >
//           <div className={styles["form-group"]}>
//             <label>Category</label>
//             <select
//               name="categoryId"
//               value={subcategoryForm.categoryId}
//               onChange={handleSubcategoryChange}
//               className={styles["form-input"]}
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.categoryName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className={styles["form-group"]}>
//             <label>Price Per Kg</label>
//             <input
//               type="number"
//               className={styles["form-input"]}
//               name="pricePerKg"
//               value={subcategoryForm.pricePerKg}
//               onChange={handleSubcategoryChange}
//               required
//             />
//           </div>
//           <div className={`${styles["form-group"]} ${styles["file-input"]}`}>
//             <label>Subcategory Image</label>
//             <input
//               type="file"
//               name="subcategoryImage"
//               onChange={handleSubcategoryChange}
//               accept="image/*"
//             />
//           </div>
//           <button
//             type="submit"
//             className={`${styles.btn} ${styles["btn-primary"]}`}
//           >
//             Add Subcategory
//           </button>
//         </form>
//       </section>

//       {/* Subcategories Table */}
//       {subcategories.length > 0 && (
//         <section className={styles["subcategory-section"]}>
//           <div className={styles["section-header"]}>
//             <h2>Trash Subcategories</h2>
//           </div>
//           <table className={styles["data-table"]}>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Price Per Kg</th>
//                 <th>Category</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subcategories.map((subcategory) => (
//                 <tr key={subcategory.id}>
//                   <td>{subcategory.id}</td>
//                   <td>{subcategory.pricePerKg}</td>
//                   <td>{subcategory.categoryName}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//       )}
//     </div>
//   );
// };

// export default AddTrashCategories;

import React, { useState, useEffect } from "react";
import styles from "../styles/AddTrashCategories.module.css";

const AddTrashCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({
    categoryName: "",
    categoryDescription: "",
    categoryImage: null,
  });

  const [subcategoryForm, setSubcategoryForm] = useState({
    categoryId: "",
    pricePerKg: "",
    subcategoryImage: null,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/common/getAllTrashCategories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const { name, value, files } = e.target;
    setCategoryForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubcategoryChange = (e) => {
    const { name, value, files } = e.target;
    setSubcategoryForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", categoryForm.categoryName);
    formData.append("categoryDescription", categoryForm.categoryDescription);
    if (categoryForm.categoryImage) {
      formData.append("categoryImage", categoryForm.categoryImage);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/admin/supplier/addTrashCategory",
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log("Category Add Response:", responseData);

      if (response.ok) {
        alert("Category added successfully!");
        fetchCategories();
        setCategoryForm({
          categoryName: "",
          categoryDescription: "",
          categoryImage: null,
        });
      } else {
        alert(
          `Failed to add category: ${responseData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category. Check console for details.");
    }
  };

  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryId", subcategoryForm.categoryId);
    formData.append("pricePerKg", subcategoryForm.pricePerKg);
    if (subcategoryForm.subcategoryImage) {
      formData.append("subcategoryImage", subcategoryForm.subcategoryImage);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/admin/supplier/addTrashSubcategory",
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log("Subcategory Add Response:", responseData);

      if (response.ok) {
        alert("Subcategory added successfully!");
        setCategoryForm({
          categoryId: "",
          pricePerKg: "",
          subcategoryImage: null,
        });
      } else {
        alert(
          `Failed to add subcategory: ${
            responseData.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      console.error("Error adding subcategory:", error);
      alert("Error adding subcategory. Check console for details.");
    }
  };

  return (
    <div className={styles["trash-categories-container"]}>
      {/* [Previous component structure remains the same] */}

      {/* Category Form */}
      <section className={styles["category-section"]}>
        <div className={styles["section-header"]}>
          <h2>Add Trash Category</h2>
        </div>
        <form
          onSubmit={handleCategorySubmit}
          className={styles["category-form"]}
        >
          <div className={styles["form-group"]}>
            <label>Category Name</label>
            <input
              className={styles["form-input"]}
              name="categoryName"
              value={categoryForm.categoryName}
              onChange={handleCategoryChange}
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label>Category Description</label>
            <input
              className={styles["form-input"]}
              name="categoryDescription"
              value={categoryForm.categoryDescription}
              onChange={handleCategoryChange}
              required
            />
          </div>
          <div className={`${styles["form-group"]} ${styles["file-input"]}`}>
            <label>Category Image</label>
            <input
              type="file"
              name="categoryImage"
              onChange={handleCategoryChange}
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className={`${styles.btn} ${styles["btn-primary"]}`}
          >
            Add Category
          </button>
        </form>
      </section>

      {/* Subcategory Form */}
      <section className={styles["subcategory-section"]}>
        <div className={styles["section-header"]}>
          <h2>Add Trash Subcategory</h2>
        </div>
        <form
          onSubmit={handleSubcategorySubmit}
          className={styles["subcategory-form"]}
        >
          <div className={styles["form-group"]}>
            <label>Category</label>
            <select
              name="categoryId"
              value={subcategoryForm.categoryId}
              onChange={handleSubcategoryChange}
              className={styles["form-input"]}
              required
            >
              <option value="">Select Category</option>
            </select>
          </div>
          <div className={styles["form-group"]}>
            <label>Price Per Kg</label>
            <input
              type="number"
              className={styles["form-input"]}
              name="pricePerKg"
              value={subcategoryForm.pricePerKg}
              onChange={handleSubcategoryChange}
              required
            />
          </div>
          <div className={`${styles["form-group"]} ${styles["file-input"]}`}>
            <label>Subcategory Image</label>
            <input
              type="file"
              name="subcategoryImage"
              onChange={handleSubcategoryChange}
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className={`${styles.btn} ${styles["btn-primary"]}`}
          >
            Add Subcategory
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddTrashCategories;
