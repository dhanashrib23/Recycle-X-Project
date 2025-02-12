import React, { useState, useEffect } from "react";
import styles from "../styles/AddTrashCategories.module.css";

const AddRecyclingCategories = () => {
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
        "http://localhost:5000/common/getAllRecyclingCategories"
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
        "http://localhost:8080/admin/consumer/addRecyclingCategory",
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
        "http://localhost:8080/admin/consumer/addRecyclingSubCategory",
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log("Subcategory Add Response:", responseData);

      if (response.ok) {
        alert("Subcategory added successfully!");
        setSubcategoryForm({
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
      <section className={styles["category-section"]}>
        <div className={styles["section-header"]}>
          <h2>Add Recycling Category</h2>
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

      <section className={styles["subcategory-section"]}>
        <div className={styles["section-header"]}>
          <h2>Add Recycling Subcategory</h2>
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
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
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

export default AddRecyclingCategories;
