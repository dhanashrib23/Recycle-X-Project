import React, { useState } from 'react';
import styles from '../styles/ContactPage.module.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you for your message!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\nSubject: ${formData.subject || "Not provided"}\nMessage: ${formData.message}`);


        setFormData({
            name: '',
            phone: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    return (
        <div className={styles['contact-page']}>
            <section className={styles.hero}>
                <div className={styles.overlay}></div>
                <div className={styles['hero-content']}>
                    <h1>Get in touch with us</h1>
                    <p>Any question or remarks? Just write us a message!</p>
                </div>
            </section>

            <div className={styles['form-container']}>
                <div className={styles['contact-form']}>
                    <h2>Send us a message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles['form-group']}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className={styles['form-group']}>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className={styles['form-group']}>
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className={styles['form-group']}>
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} />
                        </div>
                        <div className={styles['form-group']}>
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <button type="submit">Send Message</button>
                    </form>
                </div>

                <div className={styles['contact-info']}>
                    <h2>Contact Information</h2>
                    <div className={styles['contact-details']}>
                        <p>The Kabadiwala, 2, Narmadapuram Rd, near D-Mart, Vidya Nagar, Bhopal, Madhya Pradesh 462026</p>
                        <p>+91-7697260260</p>
                        <p>contact@thekabadiwala.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;