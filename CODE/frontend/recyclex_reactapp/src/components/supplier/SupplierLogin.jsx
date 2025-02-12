import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/supplierStyles/SupplierLogin.module.css';
import wavingCharacter from '../../assets/gifs/SupplierLoginPage.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const SupplierLogin = () => {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const signInResponse = await axios.post('http://localhost:5000/supplier/signin', {
                    mobileNumber,
                    password,
                });

                debugger;
                if (signInResponse.data.status === 'success') {
                    const token = signInResponse.data.token;
                    sessionStorage.setItem('token', token);
                    try {
                        const storedToken = sessionStorage.getItem('token');
                        console.log("Sending Token:", storedToken);

                        const supplierResponse = await axios.post('http://localhost:5000/supplier/mobile', {
                            mobile: mobileNumber,
                        }, {
                            headers: {
                                Authorization: storedToken ? `Bearer ${storedToken}` : "",
                            },
                        });

                        if (supplierResponse.data.status === 'success') {
                            const supplierId = supplierResponse.data.data.supplier_id;
                            sessionStorage.setItem('supplierId', supplierId);
                            navigate('/supplier/dashboard');
                        } else {
                            alert(supplierResponse.data.message || 'Error fetching supplier details.');
                        }
                    } catch (error) {
                        console.error('Error fetching supplier details:', error);
                        alert('An error occurred. Please try again later.');
                    }

                } else {
                    alert(signInResponse.data.message || 'Invalid mobile number or password.');
                }
            } catch (error) {
                console.error('Error signing in:', error);
                alert('An error occurred. Please try again later.');
            }
        }
    };

    const validateForm = () => {
        let errors = {};
        if (!mobileNumber) {
            errors.mobileNumber = 'Mobile number is required';
        } else if (!isValidMobileNumber(mobileNumber)) {
            errors.mobileNumber = 'Invalid mobile number format';
        }
        if (!password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const isValidMobileNumber = (mobileNumber) => {
        return /^[0-9]{10}$/.test(mobileNumber);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(true);
        setTimeout(() => {
            setPasswordVisible(false);
        }, 3000);
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.imageSide}>
                <img src={wavingCharacter} alt="Waving Character" className={styles.wavingImage} />
            </div>
            <div className={styles.formSide}>
                <h2>Supplier Login</h2>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <div className={styles.inputWithIcon}>
                            <FontAwesomeIcon icon={faMobileAlt} className={styles.inputIcon} />
                            <input
                                type="text"
                                id="mobileNumber"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className={`${styles.input} ${errors.mobileNumber ? styles.error : ''}`}
                            />
                        </div>
                        {errors.mobileNumber && <span className={styles.errorMessage}>{errors.mobileNumber}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <div className={styles.inputWithIcon}>
                            <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`${styles.input} ${errors.password ? styles.error : ''}`}
                            />
                            <FontAwesomeIcon
                                icon={passwordVisible ? faEyeSlash : faEye}
                                className={styles.passwordToggleIcon}
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
                    </div>
                    <button type="submit" className={styles.loginButton}>Login</button>
                    <p className={styles.forgotPassword}>
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SupplierLogin;