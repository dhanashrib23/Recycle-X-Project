// AdminRegister.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/AdminRegister.module.css";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/admin/signup",
          {
            ...formData,
            isActive: 1,
          }
        );

        if (response.status === 201) {
          setSignupSuccess(true);
          setSignupError(null);
          setTimeout(() => navigate("/admin/login"), 2000);
        } else {
          setSignupSuccess(false);
          setSignupError(response.data.message || "Signup failed.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        setSignupSuccess(false);
        setSignupError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h2>Admin Registration</h2>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.inputGroup}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          <button type="submit" className={styles.registerBtn}>
            Sign Up
          </button>
          {signupSuccess && (
            <p className={styles.successMessage}>
              Signup successful! Redirecting to login...
            </p>
          )}
          {signupError && <p className={styles.errorMessage}>{signupError}</p>}
          <p className={styles.loginLink}>
            Already have an account? <Link to="/admin/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
