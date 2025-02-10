import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/ConsumerDetails.module.css"; // Import different CSS

const ConsumerDetails = () => {
  const { consumerId } = useParams();
  const [consumer, setConsumer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsumerDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:8080/admin/consumer/${consumerId}`
        );
        setConsumer(response.data.data);
      } catch (error) {
        console.error("Error fetching consumer details:", error);
        setError("Error fetching consumer details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchConsumerDetails();
  }, [consumerId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!consumer) return <p>Consumer not found.</p>;

  return (
    <div className={styles.container}>
      <h2>Consumer Details</h2>
      <div className={styles.details}>
        <p>
          <strong>ID:</strong> {consumer.consumerId}
        </p>
        <p>
          <strong>Name:</strong> {consumer.firstName} {consumer.lastName}
        </p>
        <p>
          <strong>Email:</strong> {consumer.email}
        </p>
        <p>
          <strong>City:</strong> {consumer.city}
        </p>
        <p>
          <strong>State:</strong> {consumer.state}
        </p>
        <p>
          <strong>Pincode:</strong> {consumer.pincode}
        </p>
        {/* Add any other consumer-specific details here */}
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

export default ConsumerDetails;
