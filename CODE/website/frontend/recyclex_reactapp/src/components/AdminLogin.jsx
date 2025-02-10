import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/AdminLogin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/admin/signin",
          {
            email, // Changed from username to email
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Important for CORS
          }
        );

        if (response.data && response.data.status === "success") {
          sessionStorage.setItem("adminId", response.data.data.adminId); // Store only adminId
          navigate("/admin/dashboard");
        } else {
          alert(response.data?.message || "Invalid email or password.");
        }
      } catch (error) {
        console.error("Error signing in:", error);
        if (error.response) {
          alert(error.response.data?.message || "Authentication failed.");
        } else if (error.request) {
          alert("Server is not responding. Please try again later.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formSide}>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faUser} className={styles.inputIcon} />
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.input} ${
                  errors.email ? styles.error : ""
                }`}
              />
            </div>
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.input} ${
                  errors.password ? styles.error : ""
                }`}
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                className={styles.passwordToggleIcon}
                onClick={togglePasswordVisibility}
              />
            </div>
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          <p className={styles.forgotPassword}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
