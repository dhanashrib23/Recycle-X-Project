import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/consumerStyles/OtpVerification.module.css';
import axios from 'axios';

const OtpVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [errors, setErrors] = useState({});
    const [timer, setTimer] = useState(120);
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6);
        let interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    navigate('/');
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleBackspace = (index) => {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);

        if (index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        const validationErrors = validateForm(enteredOtp);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:5000/consumer/verifyEmail", { otp: enteredOtp });

                if (response.data.status === "success") {
                    alert("Email verified successfully!");
                    navigate("/consumer/login");
                } else {
                    alert(response.data.message || "OTP verification failed.");
                }
            } catch (error) {
                console.error("OTP verification error:", error);
                alert(error.response?.data?.message || "An error occurred. Please try again later.");
            }
        }
    };

    const validateForm = (enteredOtp) => {
        let errors = {};
        if (!enteredOtp) errors.otp = "OTP is required";
        if (!/^\d{6}$/.test(enteredOtp)) errors.otp = "Invalid OTP format";
        return errors;
    };

    return (
        <div className={styles.otpContainer}>
            <div className={styles.otpCard}>
                <h2>OTP Verification</h2>
                <p>An OTP has been sent to your email: <span className={styles.email}>{email}</span></p>
                <form onSubmit={handleSubmit} className={styles.otpForm}>
                    <div className={styles.otpInputGroup}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Backspace') {
                                        handleBackspace(index);
                                    }
                                }}
                                className={styles.otpInput}
                                ref={(el) => (inputRefs.current[index] = el)}
                            />
                        ))}
                    </div>
                    {errors.otp && <span className={styles.errorMessage}>{errors.otp}</span>}
                    <p className={styles.timer}>Time remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
                    <button type="submit" className={styles.verifyButton}>Verify</button>
                </form>
            </div>
        </div>
    );
};

export default OtpVerification;