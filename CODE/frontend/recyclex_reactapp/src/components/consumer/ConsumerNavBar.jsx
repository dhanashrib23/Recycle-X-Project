import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/consumerStyles/ConsumerNavBar.module.css';
import logo from '../../assets/icons/logo.png';
import profileIcon from '../../assets/icons/profile.png';
import cartIcon from '../../assets/icons/cart.png';

const ConsumerNavbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <nav className={styles.consumerNavbar}>
            <div className={styles.navbarLeft}>
                <Link to="/" className={styles.navbarBrand}>
                    <img src={logo} alt="RecycleX Logo" className={styles.navbarLogo} />
                    <span className={styles.navbarTitle}>RecycleX</span>
                </Link>
            </div>
            <div className={`${styles.navbarCenter} ${isNavOpen ? styles.open : ''}`}>
                <ul className={styles.navbarNav}>
                    <li className={styles.navItem}>
                        <Link to="/consumer/dashboard" className={styles.navLink}>Home</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/about" className={styles.navLink}>About</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/contact" className={styles.navLink}>Contact Us</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.navbarRight}>
                <Link to="/consumer/cart" className={styles.navIcon} title="Buy Scrap">
                    <img src={cartIcon} alt="Sell Scrap" className={styles.icon} />
                </Link>
                <Link to="/consumer/profile" className={styles.navIcon} title="Profile">
                    <img src={profileIcon} alt="Profile" className={styles.icon} />
                </Link>
                <div className={styles.hamburger} onClick={toggleNav}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
            </div>
        </nav>
    );
};

export default ConsumerNavbar;