import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/consumerStyles/ConsumerCart.module.css';
import cartImage from '../../assets/images/SideCart.jpg';

const ConsumerCart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [displayedItems, setDisplayedItems] = useState(10); 
    const consumerId = sessionStorage.getItem('consumerId');
    const token = sessionStorage.getItem('token');

    const axiosConfig = {
        headers: { 'Authorization': `Bearer ${token}` }
    };

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/common/getAllRecyclingCategories', axiosConfig); 
            console.log("Categories API Response:", response.data);
            if (response.data && response.data.data) {
                setCategories(response.data.data);
                setError(null);
            } else {
                console.error("Invalid categories API response:", response);
                setError("Error fetching categories: Invalid server response.");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError("Error fetching categories: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubcategories = async (categoryId) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/common/getRecySubCategoriesByCatId/${categoryId}`, axiosConfig);
            console.log(`Subcategories API Response (Category ${categoryId}):`, response.data);
            if (response.data && response.data.data) {
                setSubcategories(prev => ({ ...prev, [categoryId]: response.data.data }));
                setError(null);
            } else {
                console.error("Invalid subcategories API response:", response);
                setError("Error fetching subcategories: Invalid server response.");
            }
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            setError("Error fetching subcategories: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        setSelectedSubcategory(null);
        setQuantity(1);
        if (categoryId) {
            fetchSubcategories(categoryId);
        }
    };

    const handleSubcategoryChange = (e) => {
        const subcategoryId = e.target.value;
        const selectedSub = Object.values(subcategories).flat().find(sub => sub.subcategory_id === parseInt(subcategoryId, 10));
        setSelectedSubcategory(selectedSub);
        setQuantity(1);
    };

    const handleQuantityChange = (increment) => {
        setQuantity(prev => {
            const newValue = Math.max(0.25, prev + increment);
            return parseFloat(newValue.toFixed(2));
        });
    };

    const handleAddToCart = async () => {
        if (!selectedSubcategory || !consumerId || !token || quantity <= 0) {
            setError("Please select a category, subcategory, and quantity.");
            return;
        }

        try {
            setLoading(true);
            await axios.post(
                `http://localhost:5000/consumer/addcart/${selectedSubcategory.subcategory_id}`,
                { consumer_id: consumerId, quantity: quantity },
                axiosConfig
            );
            await fetchCartItems(); // Refresh cart items
            setError(null);
            setQuantity(1);
            setSelectedSubcategory(null);
        } catch (error) {
            console.error("Error adding to cart:", error);
            setError('Failed to add item to cart. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCartItems = async () => {
        if (!consumerId || !token) return;

        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:5000/consumer/showcart/${consumerId}`,
                axiosConfig
            );
            setCartItems(response.data.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setError('Failed to fetch cart items. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFromCart = async (itemId) => {
        if (!consumerId || !token) return;

        try {
            setLoading(true);
            await axios.delete(
                `http://localhost:5000/consumer/removecart/${itemId}`,
                axiosConfig
            );
            setCartItems(cartItems.filter(item => item.item_id !== itemId));
            setError(null);
        } catch (error) {
            console.error("Error deleting from cart:", error);
            setError('Failed to delete item from cart. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleProceedToCheckout = () => {
        navigate('/consumer/summary');
    };

    const handleShowMore = () => {
        setDisplayedItems(prevItems => prevItems + 10);
    };

    useEffect(() => {
        fetchCategories();
        fetchCartItems();
    }, [consumerId, token]);

    const calculateTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + item.price_per_kg * item.quantity_kg,
            0
        ).toFixed(2);
    };

    return (
        <div className={styles.container}>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.mainContent}>
                <div className={styles.imageSection}>
                    <img src={cartImage} alt="Cart" className={styles.mainImage} />
                </div>
                <div className={styles.formSection}>
                    <div className={styles.formCard}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Select Category</label>
                            <select
                                className={styles.select}
                                value={selectedCategory || ''}
                                onChange={handleCategoryChange}
                                disabled={loading || categories.length === 0}
                            >
                                <option value="">Select a category</option>
                                {categories.length > 0 &&
                                    categories.map((category) => (
                                        <option key={category.rp_category_id} value={category.rp_category_id}>
                                            {category.rp_category_name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Select Subcategory</label>
                            <select
                                className={styles.select}
                                value={selectedSubcategory?.subcategory_id || ''}
                                onChange={handleSubcategoryChange}
                                disabled={!selectedCategory || loading || !subcategories[selectedCategory] || subcategories[selectedCategory]?.length === 0}
                            >
                                <option value="">Select a subcategory</option>
                                {subcategories[selectedCategory] &&
                                    subcategories[selectedCategory].length > 0 &&
                                    subcategories[selectedCategory].map((subcategory) => (
                                        <option key={subcategory.subcategory_id} value={subcategory.subcategory_id}>
                                            {subcategory.subcategory_name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Quantity (kg)</label>
                            <div className={styles.quantityControl}>
                                <button
                                    className={styles.quantityButton}
                                    onClick={() => handleQuantityChange(-0.25)}
                                    disabled={quantity <= 0.25 || loading}
                                >
                                    -
                                </button>
                                <span className={styles.quantityDisplay}>{quantity.toFixed(2)}</span>
                                <button className={styles.quantityButton} onClick={() => handleQuantityChange(0.25)} disabled={loading}>
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            className={styles.addButton}
                            onClick={handleAddToCart}
                            disabled={!selectedSubcategory || loading}
                        >
                            {loading ? 'Adding...' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
                <div className={styles.cartSection}>
                    {cartItems.length > 0 ? (
                        <>
                            <table className={styles.cartTable}>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price/kg</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.slice(0, displayedItems).map((item) => (
                                        <tr key={item.item_id}>
                                            <td>{item.subcategory_name}</td>
                                            <td>₹{item.price_per_kg}</td>
                                            <td>{item.quantity_kg}</td>
                                            <td>₹{(item.price_per_kg * item.quantity_kg).toFixed(2)}</td>
                                            <td>
                                                <button
                                                    className={styles.deleteButton}
                                                    onClick={() => handleDeleteFromCart(item.item_id)}
                                                    disabled={loading}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className={styles.totalRow}>
                                        <td colSpan="3" className={styles.totalLabel}>
                                            Total:
                                        </td>
                                        <td className={styles.totalAmount}>₹{calculateTotalPrice()}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            {displayedItems < cartItems.length && (
                                <button className={styles.showMoreButton} onClick={handleShowMore} disabled={loading}>
                                    Show More
                                </button>
                            )}
                            <div className={styles.proceedButtonContainer}>
                                <button className={styles.proceedButton} onClick={handleProceedToCheckout} disabled={loading}>
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className={styles.emptyCartMessage}>Your cart is empty</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConsumerCart;