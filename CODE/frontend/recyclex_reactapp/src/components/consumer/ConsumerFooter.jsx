import React from "react";
import styles from "../../styles/consumerStyles/ConsumerFooter.module.css"; 
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
    FaEnvelope,
    FaPhone,
} from "react-icons/fa";

const ConsumerFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h5>Businesses</h5>
                        <ul>
                            <li>EPR</li>
                            <li>Circular Economy</li>
                            <li>Paper Shredding</li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h5>Individuals</h5>
                        <ul>
                            <li>Scrap Collection</li>
                            <li>Vehicle Scrapping</li>
                            <li>Zero Waste Society</li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h5>Company</h5>
                        <ul>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Franchise</li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h5>Help</h5>
                        <ul>
                            <li>Contact Us</li>
                            <li>Privacy Policy</li>
                            <li>Terms & Conditions</li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h4>RecycleX</h4>
                        <p>
                            <FaEnvelope className={styles.icon} /> Email:
                            <a href="mailto:recycleX@gmail.com"> recycle@gmail.com</a>
                        </p>
                        <p>
                            <FaPhone className={styles.icon} /> Phone:
                            <a href="tel:+919874563210"> +91-7756087094</a>
                        </p>
                        <p>Address: 123 Sunbeam Infotech, Hinjewadi, Pune</p>
                        <p>&copy; {currentYear} RecycleX. All rights reserved.</p>
                    </div>

                    <div className={styles.socialIcons}>
                        <a href="#" aria-label="Facebook"><FaFacebook /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ConsumerFooter;
