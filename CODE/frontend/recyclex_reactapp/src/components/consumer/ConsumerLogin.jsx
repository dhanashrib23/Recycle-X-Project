import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/consumerStyles/ConsumerLogin.module.css'; 
import wavingCharacter from '../../assets/gifs/ConsumerLoginPage.gif'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ConsumerLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const signInResponse = await axios.post('http://localhost:5000/consumer/signin', {
                    email,
                    password,
                });

                if (signInResponse.data.status === 'success') {
                    const token = signInResponse.data.token;
                    sessionStorage.setItem('token', token);
                    debugger;
                    try {
                        const consumerResponse = await axios.post('http://localhost:5000/consumer/email', { email }, {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                            },
                        });

                        if (consumerResponse.data.status === 'success') {
                            const consumerId = consumerResponse.data.data.id;
                            sessionStorage.setItem('consumerId', consumerId);
                            navigate('/consumer/dashboard');
                        } else {
                            alert(consumerResponse.data.message || 'Error fetching consumer details.');
                        }
                    } catch (error) {
                        console.error('Error fetching consumer details:', error);
                        alert('An error occurred. Please try again later.');
                    }
                } else {
                    alert(signInResponse.data.message || 'Invalid email or password.');
                }
            } catch (error) {
                console.error('Error signing in:', error);
                alert('An error occurred. Please try again later.');
            }
        }
    };

    const validateForm = () => {
        let errors = {};
        if (!email) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            errors.email = 'Invalid email format';
        }
        if (!password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
                <h2 className='consumer-title'>Consumer Login</h2>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <div className={styles.inputWithIcon}>
                            <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                            />
                        </div>
                        {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
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

export default ConsumerLogin;