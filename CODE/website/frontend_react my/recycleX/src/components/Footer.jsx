import React from "react";
import "../assets/css/Footer.css"; // Ensure CSS is imported
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12 footer-content">
            {" "}
            {/* All content in one row */}
            {/* Business Section */}
            <div className="footer-section">
              <h5>Businesses</h5>
              <ul className="list-unstyled">
                <li>EPR</li>
                <li>Circular Economy</li>
                <li>Paper Shredding</li>
              </ul>
            </div>
            {/* Individuals Section */}
            <div className="footer-section">
              <h5>Individuals</h5>
              <ul className="list-unstyled">
                <li>Scrap Collection</li>
                <li>Vehicle Scrapping</li>
                <li>Zero Waste Society</li>
              </ul>
            </div>
            {/* Company Section */}
            <div className="footer-section">
              <h5>Company</h5>
              <ul className="list-unstyled">
                <li>About Us</li>
                <li>Careers</li>
                <li>Franchise</li>
              </ul>
            </div>
            {/* Help Section */}
            <div className="footer-section">
              <h5>Help</h5>
              <ul className="list-unstyled">
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            {/* Contact Details */}
            <div className="footer-section contact-info">
              {/* Keep address if needed */}
              <p>
                <h4>RecycleX</h4>
              </p>
              <p>
                <FaEnvelope /> Email:{" "}
                <a href="mailto:recycleX@gmail.com">recycle@gmail.com</a>
              </p>
              <p>
                <FaPhone /> Phone:{" "}
                <a href="tel:+919874563210">+91-7758067094</a>
              </p>
              <p>📍 Address: 123 sunbeam infotech, Hinjewadi, Pune</p>{" "}
              <p>&copy; {currentYear} RecycleX. All rights reserved.</p>
            </div>
            {/* Social Media Icons */}
            <div className="footer-section social-icons">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a href="#" aria-label="Facebook">
                    <FaFacebook />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
