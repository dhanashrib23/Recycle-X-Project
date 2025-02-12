import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/supplierStyles/SupplierCart.module.css';
import cartImage from '../../assets/images/SideCart.jpg';

const SupplierCart = () => {
    const navigate = useNavigate();
    const [trashCategories, setTrashCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('1'); 
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [quantity, setQuantity] = useState(0.0);
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const supplierId = sessionStorage.getItem('supplierId');
    const token = sessionStorage.getItem('token');

    const axiosConfig = {
        headers: { 'Authorization': `Bearer ${token}` }
    };

    const fetchTrashCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                'http://localhost:5000/common/getAllTrashCategories',
                axiosConfig
            );
            setTrashCategories(response.data.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching trash categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubcategories = async () => {
        if (!selectedCategory) return;

        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:5000/common/getTrashSubCategoriesByCatId/${selectedCategory}`,
                axiosConfig
            );
            setSubcategories(response.data.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCartItems = async () => {
        if (!supplierId || !token) return;

        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:5000/supplier/showcart/${supplierId}`,
                axiosConfig
            );
            setCartItems(response.data.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory(null);
    };

    const handleSubcategoryChange = (e) => {
        const selectedSub = subcategories.find(
            sub => sub.subcategory_id === parseInt(e.target.value, 10)
        );
        setSelectedSubcategory(selectedSub);
    };

    const handleQuantityChange = (increment) => {
        setQuantity(prev => {
            const newValue = Math.max(0, prev + increment);
            return parseFloat(newValue.toFixed(2));
        });
    };

    const handleAddToCart = async () => {
        if (!selectedSubcategory || !supplierId || !token || quantity <= 0) return;

        try {
            setLoading(true);
            await axios.post(
                `http://localhost:5000/supplier/addcart/${selectedSubcategory.subcategory_id}`,
                { supplier_id: supplierId, quantity },
                axiosConfig
            );
            await fetchCartItems();
            setQuantity(0.0);
            setError(null);
        } catch (error) {
            setError('Failed to add item to cart. Please try again.');
            console.error("Error adding to cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFromCart = async (itemId) => {
        if (!supplierId || !token) return;

        try {
            setLoading(true);
            await axios.delete(
                `http://localhost:5000/supplier/removecart/${itemId}`,
                axiosConfig
            );
            const updatedCartItems = cartItems.filter(item => item.item_id !== itemId);
            setCartItems(updatedCartItems);
            setError(null);
        } catch (error) {
            setError('Failed to delete item from cart. Please try again.');
            console.error("Error deleting from cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleProceedToSummary = () => {
        navigate('/supplier/summary');
    };

    useEffect(() => {
        fetchTrashCategories();
    }, [token]);

    useEffect(() => {
        fetchSubcategories();
    }, [selectedCategory, token]);

    useEffect(() => {
        fetchCartItems();
    }, [supplierId, token]);

    const calculateTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + item.price_per_kg * item.quantity_kg,
            0
        ).toFixed(2);
    };

    return (
        <div className={styles.container}>
            {error && (
                <div className={styles.error}>
                    {error}
                </div>
            )}

            <div className={styles.mainContent}>
                <div className={styles.imageSection}>
                    <img
                        src={cartImage}
                        alt="Cart Selection"
                        className={styles.mainImage}
                    />
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formCard}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Select Category</label>
                            <select
                                className={styles.select}
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                disabled={loading}
                            >
                                {trashCategories.map((category) => (
                                    <option
                                        key={category.category_id}
                                        value={category.category_id}
                                    >
                                        {category.category_name}
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
                                disabled={!selectedCategory || loading}
                            >
                                <option value="">Select a subcategory</option>
                                {subcategories.map((subcategory) => (
                                    <option
                                        key={subcategory.subcategory_id}
                                        value={subcategory.subcategory_id}
                                    >
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
                                    onClick={() => handleQuantityChange(-0.5)}
                                    disabled={quantity <= 0 || loading}
                                >
                                    -
                                </button>
                                <span className={styles.quantityDisplay}>
                                    {quantity.toFixed(2)}
                                </span>
                                <button
                                    className={styles.quantityButton}
                                    onClick={() => handleQuantityChange(0.5)}
                                    disabled={loading}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            className={styles.addButton}
                            onClick={handleAddToCart}
                            disabled={!selectedSubcategory || quantity <= 0 || loading}
                        >
                            {loading ? 'Adding...' : 'Add to Cart'}
                        </button>
                    </div>
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
                                {cartItems.map((item) => (
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
                                    <td className={styles.totalAmount}>
                                        ₹{calculateTotalPrice()}
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={styles.proceedButtonContainer}>
                            <button
                                className={styles.proceedButton}
                                onClick={handleProceedToSummary}
                            >
                                Proceed to Order Summary
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyCartMessage}>
                        Your cart is empty
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupplierCart;