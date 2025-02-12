import React, { useState, useEffect } from "react";
import styles from "../../styles/consumerStyles/ConsumerHomePage.module.css";
import ConsumerNavbar from "./ConsumerNavBar";
import ConsumerFooter from "./ConsumerFooter";
import axios from "axios";

const ConsumerBuyScrap = () => {
    const [pincode, setPincode] = useState("");
    const [serviceAvailability, setServiceAvailability] = useState(null);
    const [mainCategories, setMainCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [allSubcategories, setAllSubcategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [checkingService, setCheckingService] = useState(false);

    const consumerId = sessionStorage.getItem("consumerId");
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:5000/common/getAllRecyclingCategories", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setMainCategories(response.data.data);
        }).catch(error => console.error(error));

        axios.get("http://localhost:5000/common/getAllRecyclingSubCategories", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setAllSubcategories(response.data.data);
        }).catch(error => console.error(error));
    }, [token]);

    const checkServiceAvailability = () => {
        setCheckingService(true);
        axios.post("http://localhost:5000/common/findServiceByPincode", { pincode }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setServiceAvailability(response.data.data);
        }).catch(error => console.error(error))
            .finally(() => setCheckingService(false));
    };

    const fetchSubcategories = (categoryId) => {
        setActiveCategory(categoryId);
        axios.get(`http://localhost:5000/common/getRecySubCategoriesByCatId/${categoryId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setSubcategories(response.data.data);
        }).catch(error => console.error(error));
    };

    return (
        <div className={styles.container}>
            <ConsumerNavbar />
            <div className={styles.main}>
                <h1 className={styles.pageTitle}>Buy Scrap</h1>

                <div className={styles.searchSection}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Enter Pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className={styles.searchInput}
                        />
                        <button
                            onClick={checkServiceAvailability}
                            className={`${styles.categoryButton} ${checkingService ? styles.active : ""}`}
                        >
                            {checkingService ? "Checking..." : "Check Service"}
                        </button>
                    </div>
                    {serviceAvailability && (
                        <p>Service Available in: {serviceAvailability[0]?.city}, {serviceAvailability[0]?.state}</p>
                    )}
                </div>

                <div className={styles.categoriesSection}>
                    <div className={styles.categoriesContainer}>
                        {mainCategories.map(category => (
                            <button
                                key={category.rp_category_id}
                                onClick={() => fetchSubcategories(category.rp_category_id)}
                                className={`${styles.categoryButton} ${activeCategory === category.rp_category_id ? styles.active : ""}`}
                            >
                                {category.rp_category_name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.subcategoriesGrid}>
                    {subcategories.map(sub => (
                        <div key={sub.subcategory_id} className={styles.subcategoryCard}>
                            <div className={styles.subcategoryImageContainer}>
                                <img src={`http://localhost:3000/images/${sub.subcategory_image}`} alt={sub.subcategory_name} className={styles.subcategoryImage} />
                            </div>
                            <h3 className={styles.subcategoryTitle}>{sub.subcategory_name}</h3>
                            <p className={styles.subcategoryPrice}>₹{sub.price_per_kg} per kg</p>
                        </div>
                    ))}
                </div>
            </div>
            <ConsumerFooter />
        </div>
    );
};

export default ConsumerBuyScrap;
