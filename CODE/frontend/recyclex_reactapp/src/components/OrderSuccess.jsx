import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/OrderSuccess.module.css"; 
import OrderSuccessGif from "../assets/gifs/OrderSuccess.gif"; 

const OrderSuccess = () => {
    const [orderId, setOrderId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setOrderId(Math.floor(Math.random() * 1000000));
    }, []);

    return (
        <div className={styles.container}>
            <img
                src={OrderSuccessGif}
                alt="Order Confirmed"
                className={styles.successGif}
            />

            <h3 className={styles.title}>Your Order has been placed successfully!</h3>
            <p className={styles.orderText}>
                Your order ID is: <strong>{orderId}</strong>
            </p>
            <p className={styles.orderText}>
                Order Tracking: <strong>Shipped</strong>
            </p>
            <p className={styles.orderText}>
                Expected Delivery: <strong>2-5 business days</strong>
            </p>

            <div className={styles.infoBox}>
                <h5>🌍 Thank you for supporting sustainability!</h5>
                <p>
                    By choosing RecycleX, you help reduce waste, save energy, and
                    conserve natural resources. Your contribution plays a vital role in
                    protecting our planet for future generations.
                </p>
            </div>

            <button className={styles.backButton} onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    );
};

export default OrderSuccess;