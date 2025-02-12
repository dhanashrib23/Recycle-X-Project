import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AdminHomePage.module.css";

const AdminHomePage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [consumers, setConsumers] = useState([]);
  const [activeTab, setActiveTab] = useState("suppliers");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch("http://localhost:8080/admin/supplier/");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setSuppliers(data.data);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
      }
    };

    const fetchConsumers = async () => {
      try {
        const res = await fetch("http://localhost:8080/admin/consumer/");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setConsumers(data.data);
      } catch (err) {
        console.error("Error fetching consumers:", err);
      }
    };

    fetchSuppliers();
    fetchConsumers();
  }, []);

  const handleDeleteSupplier = async (supplierId) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        const res = await fetch(
          `http://localhost:8080/admin/supplier/${supplierId}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        setSuppliers(
          suppliers.filter((supplier) => supplier.supplierId !== supplierId)
        );
        alert("Supplier deleted successfully");
      } catch (error) {
        console.error("Error deleting supplier:", error);
        alert("Error deleting supplier. Please try again.");
      }
    }
  };

  const handleDeleteConsumer = async (consumerId) => {
    if (window.confirm("Are you sure you want to delete this consumer?")) {
      try {
        const res = await fetch(
          `http://localhost:8080/admin/consumer/${consumerId}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        setConsumers(
          consumers.filter((consumer) => consumer.consumerId !== consumerId)
        );
        alert("Consumer deleted successfully");
      } catch (error) {
        console.error("Error deleting consumer:", error);
        alert("Error deleting consumer. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topButtons}>
        <button
          className={styles.trashButton}
          onClick={() => navigate("/admin/addTrashCategory")}
        >
          Add Trash Categories
        </button>
        <button
          className={styles.recycleButton}
          onClick={() => navigate("/admin/addRecyclingCategories")}
        >
          Add Recycling Categories
        </button>
      </div>

      <div className={styles.switchContainer}>
        <button
          className={activeTab === "suppliers" ? styles.active : ""}
          onClick={() => setActiveTab("suppliers")}
        >
          Suppliers
        </button>
        <button
          className={activeTab === "consumers" ? styles.active : ""}
          onClick={() => setActiveTab("consumers")}
        >
          Consumers
        </button>
      </div>

      {activeTab === "suppliers" ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.supplierId}>
                <td>{supplier.supplierId}</td>
                <td>
                  {supplier.firstName} {supplier.lastName}
                </td>
                <td>{supplier.mobileNumber}</td>
                <td>{supplier.city}</td>
                <td>
                  <button
                    className={styles.viewBtn}
                    onClick={() =>
                      navigate(`/admin/supplier/${supplier.supplierId}`)
                    }
                  >
                    View
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteSupplier(supplier.supplierId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {consumers.map((consumer) => (
              <tr key={consumer.consumerId}>
                <td>{consumer.consumerId}</td>
                <td>
                  {consumer.firstName} {consumer.lastName}
                </td>
                <td>{consumer.email}</td>
                <td>{consumer.city}</td>
                <td>
                  <button
                    className={styles.viewBtn}
                    onClick={() =>
                      navigate(`/admin/consumer/${consumer.consumerId}`)
                    }
                  >
                    View
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteConsumer(consumer.consumerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className={styles.bottomButtons}>
        <button
          className={styles.leftButton}
          onClick={() => navigate("/admin/getAllYearlyTrash")}
        >
          Get Yearly Trash Categories
        </button>
        <button
          className={styles.rightButton}
          onClick={() => navigate("/admin/getAllYearlyProduct")}
        >
          Get Yearly Recycled Categories
        </button>
      </div>
    </div>
  );
};

export default AdminHomePage;
