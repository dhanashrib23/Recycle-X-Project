import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/supplierStyles/SupplierRegister.module.css';
import signupImage from '../../assets/images/SupplierRegisterPage.jpg';
import axios from 'axios';

const SupplierRegister = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [supplierType, setSupplierType] = useState('Individual');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:5000/supplier/signup', {
                    firstName,
                    lastName,
                    mobileNumber,
                    password,
                    state,
                    city,
                    pincode,
                    supplierType,
                });

                if (response.data.status === 'success') {
                    alert('Signup successful!');
                    navigate('/supplier/login');
                } else {
                    alert(response.data.message || 'Signup failed.');
                }
            } catch (error) {
                console.error('Signup error:', error);
                alert('An error occurred. Please try again later.');
            }
        }
    };

    const validateForm = () => {
        let errors = {};
        if (!firstName) errors.firstName = 'First name is required';
        if (!lastName) errors.lastName = 'Last name is required';
        if (!mobileNumber) errors.mobileNumber = 'Mobile number is required';
        if (!isValidMobileNumber(mobileNumber)) errors.mobileNumber = 'Invalid mobile number';
        if (!password) errors.password = 'Password is required';
        if (!state) errors.state = 'State is required';
        if (!city) errors.city = 'City is required';
        if (!pincode) errors.pincode = 'Pincode is required';
        if (!isValidPincode(pincode)) errors.pincode = 'Invalid pincode';
        return errors;
    };

    const isValidMobileNumber = (mobileNumber) => /^[0-9]{10}$/.test(mobileNumber);
    const isValidPincode = (pincode) => /^[0-9]{6}$/.test(pincode);

    return (
        <div className={styles.signupContainer}>
            <div className={styles.imageSide}>
                <img src={signupImage} alt="Signup" className={styles.signupImage} />
            </div>
            <div className={styles.formSide}>
                <h2>Supplier Registration</h2>
                <form onSubmit={handleSubmit} className={styles.signupForm}>
                    <div className={styles.nameFields}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`${styles.input} ${errors.firstName ? styles.error : ''}`} />
                            {errors.firstName && <span className={styles.errorMessage}>{errors.firstName}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className={`${styles.input} ${errors.lastName ? styles.error : ''}`} />
                            {errors.lastName && <span className={styles.errorMessage}>{errors.lastName}</span>}
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <input type="text" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className={`${styles.input} ${errors.mobileNumber ? styles.error : ''}`} />
                        {errors.mobileNumber && <span className={styles.errorMessage}>{errors.mobileNumber}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${styles.input} ${errors.password ? styles.error : ''}`} />
                        {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
                    </div>

                    <div className={styles.locationFields}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="state">State</label>
                            <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} className={`${styles.input} ${errors.state ? styles.error : ''}`} />
                            {errors.state && <span className={styles.errorMessage}>{errors.state}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className={`${styles.input} ${errors.city ? styles.error : ''}`} />
                            {errors.city && <span className={styles.errorMessage}>{errors.city}</span>}
                        </div>
                    </div>

                    <div className={styles.pincodeAndTypeFields}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="pincode">Pincode</label>
                            <input type="text" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className={`${styles.input} ${errors.pincode ? styles.error : ''}`} />
                            {errors.pincode && <span className={styles.errorMessage}>{errors.pincode}</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="supplierType">Supplier Type</label>
                            <select id="supplierType" value={supplierType} onChange={(e) => setSupplierType(e.target.value)} className={styles.input}>
                                <option value="Individual">Individual</option>
                                <option value="Government">Government</option>
                                <option value="Organization">Organization</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className={styles.signupButton}>Sign Up</button>
                    <p className={styles.loginLink}>
                        Already have an account? <Link to="/supplier/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SupplierRegister;