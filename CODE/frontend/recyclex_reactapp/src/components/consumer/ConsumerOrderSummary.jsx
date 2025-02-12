import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/consumerStyles/ConsumerOrderSummary.module.css";
import { useNavigate } from "react-router-dom";
const ConsumerOrderSummary = () => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const token = sessionStorage.getItem("token");
    const consumerId = sessionStorage.getItem("consumerId");

    useEffect(() => {
        fetchAddresses();
        fetchCartItems();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/consumer/delivery`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const filteredAddresses = response.data.data.filter(addr => addr.consumer_id == consumerId);
            setAddresses(filteredAddresses);
        } catch (error) {
            console.error("Error fetching addresses", error);
        }
    };

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/consumer/showcart/${consumerId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems(response.data.data);
        } catch (error) {
            console.error("Error fetching cart items", error);
        }
    };

    const handleAddAddress = async (newAddress) => {
        try {
            await axios.post("http://localhost:5000/consumer/delivery", newAddress, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAddresses();
        } catch (error) {
            console.error("Error adding address", error);
        }
    };

    const handleUpdateAddress = async (updatedAddress, deliveryId) => {
        try {
            await axios.put(`http://localhost:5000/consumer/delivery/${deliveryId}`, updatedAddress, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAddresses();
        } catch (error) {
            console.error("Error updating address", error);
        }
    };

    const handleDeleteAddress = async (deliveryId) => {
        try {
            await axios.delete(`http://localhost:5000/consumer/delivery/${deliveryId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAddresses();
        } catch (error) {
            console.error("Error deleting address", error);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert("Please select a delivery address.");
            return;
        }
        try {
            await axios.post("http://localhost:5000/consumer/placeorder", {
                consumerId,
                deliveryId: selectedAddress
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate("/success");
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Order Summary</h2>
            <div className={styles.addressSection}>
                <h3>Select Delivery Address</h3>
                <select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                    <option value="">Select an Address</option>
                    {addresses.map((address) => (
                        <option key={address.delivery_id} value={address.delivery_id}>
                            {`${address.street_name}, ${address.city}, ${address.state} - ${address.pincode}`}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.orderSummary}>
                <h3>Cart Items</h3>
                <table className={styles.cartTable}>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price (per kg)</th>
                            <th>Quantity (kg)</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.item_id}>
                                <td>{item.subcategory_name}</td>
                                <td>₹{item.price_per_kg}</td>
                                <td>{item.quantity_kg}</td>
                                <td>₹{item.price_per_kg * item.quantity_kg}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handlePlaceOrder} className={styles.placeOrderBtn}>Place Order</button>
            </div>
        </div>
    );
};

export default ConsumerOrderSummary;
