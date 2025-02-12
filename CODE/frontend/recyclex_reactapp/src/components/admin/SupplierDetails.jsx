import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/SupplierDetails.module.css";

const SupplierDetails = () => {
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplierDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:8080/admin/supplier/${supplierId}`
        );
        setSupplier(response.data.data);
      } catch (error) {
        console.error("Error fetching supplier details:", error);
        setError("Error fetching supplier details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierDetails();
  }, [supplierId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!supplier) return <p>Supplier not found.</p>;

  return (
    <div className={styles.container}>
      <h2>Supplier Details</h2>
      <div className={styles.details}>
        <p>
          <strong>ID:</strong> {supplier.supplierId}
        </p>
        <p>
          <strong>Name:</strong> {supplier.firstName} {supplier.lastName}
        </p>
        <p>
          <strong>Mobile:</strong> {supplier.mobileNumber}
        </p>
        <p>
          <strong>City:</strong> {supplier.city}
        </p>
        <p>
          <strong>State:</strong> {supplier.state}
        </p>
        <p>
          <strong>Pincode:</strong> {supplier.pincode}
        </p>
        <p>
          <strong>Type:</strong> {supplier.supplierType}
        </p>
        <p>
          <strong>Status:</strong> {supplier.supplierStatus}
        </p>
      </div>
      <button
        className={styles.backBtn}
        onClick={() => navigate("/admin/dashboard")}
      >
        Back
      </button>
    </div>
  );
};

export default SupplierDetails;
