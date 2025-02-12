import React from "react";
import styles from "../styles/AboutUsPage.module.css";
import aboutImage from "../assets/images/about.jpg";

const AboutUsPage = () => {
    return (
        <div className={styles.aboutUs}>
            <section className={styles.hero}>
                <div className={styles.overlay}></div>
                <div className={styles.heroContent}>
                    <h1>About RecycleX</h1>
                    <p>Driving Sustainability, One Bin at a Time.</p>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Our Story</h2>
                <p>
                    RecycleX was born from a simple yet powerful idea: to make recycling accessible, convenient, and rewarding for everyone.  We believe that a sustainable future is within reach, and we're committed to playing a pivotal role in making that happen. Founded in [Year], we started as a small team of passionate environmentalists and have since grown into a leading force in the recycling industry.
                </p>
                <img src={aboutImage} alt="Recycling process" className={styles.aboutImage} />

            </section>

            <section className={styles.section}>
                <h2>Our Mission</h2>
                <p>
                    To revolutionize waste management by providing innovative solutions that empower individuals, businesses, and communities to embrace recycling as a way of life.
                </p>
                <h2>Our Vision</h2>
                <p>
                    To create a world where waste is minimized, resources are conserved, and a circular economy thrives, ensuring a healthier planet for generations to come.
                </p>
            </section>


            <section className={styles.section}>
                <h2>How RecycleX Works</h2>
                <div className={styles.flexContainer}>
                    <div className={styles.card}>
                        <h3>For Suppliers</h3>
                        <p>
                            Easily list your recyclable materials, set your prices, and connect with businesses in need.  RecycleX simplifies the process of selling your recyclables, making it more efficient and profitable.
                        </p>
                    </div>
                    <div className={styles.card}>
                        <h3>For Consumers</h3>
                        <p>
                            Schedule convenient waste pickups, track your recycling efforts, and earn rewards for your commitment to sustainability.  RecycleX makes it easy for you to make a difference.
                        </p>
                    </div>
                    <div className={styles.card}>
                        <h3>For Businesses</h3>
                        <p>
                            Source high-quality recycled materials, reduce your environmental footprint, and contribute to a circular economy. RecycleX connects you with reliable suppliers and helps you meet your sustainability goals.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.impact}>
                <h2>Our Impact</h2>
                <div className={styles.impactStats}>
                    <div>
                        <h3>100+</h3>
                        <p>Tons of Waste Recycled</p>
                    </div>
                    <div>
                        <h3>50+</h3>
                        <p>Partner Businesses</p>
                    </div>
                    <div>
                        <h3>1000+</h3>
                        <p>Active Users</p>
                    </div>
                </div>
                <p>We're proud of the progress we've made, but we know there's more to do. Join us in creating a sustainable future!</p>
            </section>

            <section className={styles.contact}>
                <h2>Get Involved</h2>
                <p>Ready to make a difference? <a href="/contact">Contact us</a> to learn more about how you can join the RecycleX movement.</p>
            </section>
        </div>
    );
};

export default AboutUsPage;