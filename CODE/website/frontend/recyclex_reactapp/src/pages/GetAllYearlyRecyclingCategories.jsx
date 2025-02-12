import React, { useState, useEffect } from "react";
import styles from "../styles/GetAllYearlyRecyclingCategories.module.css";

const GetAllYearlyRecyclingCategories = () => {
  const [yearlyRecycling, setYearlyRecycling] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchYearlyRecycling = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/admin/consumer/yearlyRecyclingAll"
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const result = await res.json();
        setYearlyRecycling(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        setError("Failed to fetch data. Backend might be down.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchYearlyRecycling();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Yearly Recycling Categories</h2>

      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && yearlyRecycling.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category ID</th>
              <th>Subcategory Name</th>
              <th>Price Per Kg</th>
              <th>Image</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {yearlyRecycling.map((item) => (
              <tr key={item.subcategory_id}>
                <td>{item.subcategory_id}</td>
                <td>{item.category_id}</td>
                <td>{item.subcategory_name}</td>
                <td>₹{item.price_per_kg?.toFixed(2)}</td>
                <td>
                  {item.subcategory_image ? (
                    <img
                      src={`http://localhost:8080/uploads/${item.subcategory_image}`}
                      alt={item.subcategory_name}
                      className={styles.image}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  {item.category_description || "No description available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && (
          <p className={styles.noData}>No yearly recycling data available.</p>
        )
      )}
    </div>
  );
};

export default GetAllYearlyRecyclingCategories;
