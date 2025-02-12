import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/UserTypeSelection.module.css';
import { FaInfoCircle } from 'react-icons/fa';
import SupplierIcon from '../assets/icons/supplier.png';
import ConsumerIcon from '../assets/icons/consumer.png';
import { Link } from 'react-router-dom';

const UserTypeSelection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 100);
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 position-relative">

            <div
                className={`${styles.helpButton}`}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <FaInfoCircle className={styles.helpIcon} />
                <span className={styles.helpText}>Help</span>

                {showTooltip && (
                    <div className={styles.tooltip}>
                        <h6>Supplier</h6>
                        <p>A supplier provides recyclable waste materials.</p>
                        <p>They help sustainability by ensuring waste is collected and processed.</p>
                        <p>At RecycleX, suppliers sell waste for reuse.</p>
                        <hr />
                        <h6>Consumer</h6>
                        <p>A consumer buys high-quality recycled materials.</p>
                        <p>They use recyclables for manufacturing and production.</p>
                        <p>At RecycleX, consumers support the circular economy.</p>
                    </div>
                )}
            </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card-group">
                            <div className={`card ${styles.userTypeContainer} ${isVisible ? styles.visible : ''} ${styles.spacedCard} ${styles.ratioCard}`}>
                                <div className="card-body text-center">
                                    <img src={SupplierIcon} alt="Supplier Icon" className={styles.icon} />
                                    <h5 className="card-title">Supplier</h5>
                                    <p className="card-text">Sell your recyclable waste effortlessly and play a vital role in creating a cleaner, greener environment while earning rewards.</p>
                                    <div className="card-body text-center">
                                        <Link to="/supplier/login" className={`btn ${styles.signInButton}`}>Sign In</Link><br />
                                        <Link to="/supplier/register" className={`btn ${styles.signUpButton}`}>Click here to Sign Up</Link>
                                    </div>
                                </div>
                            </div>

                            <div className={`card ${styles.userTypeContainer} ${isVisible ? styles.visible : ''} ${styles.spacedCard} ${styles.ratioCard}`}>
                                <div className="card-body text-center">
                                    <img src={ConsumerIcon} alt="Consumer Icon" className={styles.icon} />
                                    <h5 className="card-title">Consumer</h5>
                                    <p className="card-text">Get high-quality recycled materials, processed and refined by RecycleX, ready for use in your manufacturing and production needs.</p>
                                    <div className="card-body text-center">
                                        <Link to="/consumer/login" className={`btn ${styles.signInButton}`}>Sign In</Link><br />
                                        <Link to="/consumer/register" className={`btn ${styles.signUpButton}`}>Click here to Sign Up</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTypeSelection;
