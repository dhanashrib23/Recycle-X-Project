import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/supplierStyles/SupplierOrderSummary.module.css';

const AddressForm = React.memo(({ isEditing, data, setData, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={(e) => onSubmit(e, isEditing)} className={styles.addressForm}>
            <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="street_name"
                placeholder="Street Name"
                value={formData.street_name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={formData.landmark}
                onChange={handleChange}
                required
            />
            <button type="submit" disabled={loading}>
                {isEditing ? 'Update' : 'Add'} Address
            </button>
            <button type="button" onClick={onCancel} disabled={loading}>
                Cancel
            </button>
        </form>
    );
});

const SupplierOrderSummary = () => {
    const navigate = useNavigate();
    const [pickupAddresses, setPickupAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const initialAddressState = {
        supplierId: '',
        supplierName: '',
        state: '',
        city: '',
        pincode: '',
        street_name: '',
        landmark: '',
    };

    const [newAddress, setNewAddress] = useState(initialAddressState);

    const supplierId = sessionStorage.getItem('supplierId');
    const token = sessionStorage.getItem('token');
    const supplierName = sessionStorage.getItem('supplierName');

    const axiosConfig = {
        headers: { 'Authorization': `Bearer ${token}` }
    };

    useEffect(() => {
        const fetchPickupAddresses = async () => {
            if (!supplierId || !token) return;

            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/supplier/pickup', axiosConfig);
                const filteredAddresses = response.data.data.filter(
                    address => address.supplier_id === parseInt(supplierId, 10)
                );
                setPickupAddresses(filteredAddresses);
                if (filteredAddresses.length > 0) {
                    setSelectedAddress(filteredAddresses[0]);
                }
                setError(null);
            } catch (err) {
                console.error("Error fetching addresses:", err);
                setError("Failed to load addresses. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPickupAddresses();
    }, [supplierId, token]);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!supplierId || !token) return;

            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:5000/supplier/showcart/${supplierId}`,
                    axiosConfig
                );
                const items = response.data.data;
                setCartItems(items);
                setTotalItems(items.length);
                const total = items.reduce(
                    (sum, item) => sum + (item.price_per_kg * item.quantity_kg),
                    0
                );
                setTotalPrice(total.toFixed(2));
                setError(null);
            } catch (err) {
                console.error("Error fetching cart items:", err);
                setError("Failed to load cart items. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [supplierId, token]);

    const handleAddNewAddress = () => {
        setIsAddingAddress(true);
        setNewAddress({
            ...initialAddressState,
            supplierId,
            supplierName
        });
    };

    const handleAddressSubmit = async (e, isEditing = false) => {
        e.preventDefault();
        const addressData = isEditing ? editingAddress : newAddress;

        try {
            setLoading(true);
            if (isEditing) {
                await axios.put(
                    `http://localhost:5000/supplier/pickup/${editingAddress.pickup_id}`,
                    addressData,
                    axiosConfig
                );
            } else {
                await axios.post('http://localhost:5000/supplier/pickup', addressData, axiosConfig);
            }

            const response = await axios.get('http://localhost:5000/supplier/pickup', axiosConfig);
            const filteredAddresses = response.data.data.filter(
                address => address.supplier_id === parseInt(supplierId, 10)
            );
            setPickupAddresses(filteredAddresses);
            setIsAddingAddress(false);
            setIsEditingAddress(false);
            setNewAddress(initialAddressState);
            setEditingAddress(null);
            setError(null);
        } catch (err) {
            console.error("Error handling address:", err);
            setError(`Failed to ${isEditing ? 'update' : 'add'} address. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAddress = async (pickupId) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;

        try {
            setLoading(true);
            await axios.delete(`http://localhost:5000/supplier/pickup/${pickupId}`, axiosConfig);

            const response = await axios.get('http://localhost:5000/supplier/pickup', axiosConfig);
            const filteredAddresses = response.data.data.filter(
                address => address.supplier_id === parseInt(supplierId, 10)
            );
            setPickupAddresses(filteredAddresses);

            if (selectedAddress?.pickup_id === pickupId) {
                setSelectedAddress(filteredAddresses[0] || null);
            }
            setError(null);
        } catch (err) {
            console.error("Error deleting address:", err);
            setError("Failed to delete address. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            setError("Please select a delivery address");
            return;
        }

        if (cartItems.length === 0) {
            setError("Your cart is empty");
            return;
        }

        try {
            setLoading(true);
            navigate('/success');
        } catch (err) {
            console.error("Error placing order:", err);
            setError("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {error && <div className={styles.error}>{error}</div>}

            <h2>Order Summary</h2>

            <div className={styles.addressSection}>
                <h3>Delivery Address</h3>

                {pickupAddresses.length > 0 ? (
                    <select
                        value={selectedAddress?.pickup_id || ''}
                        onChange={(e) => {
                            const selected = pickupAddresses.find(
                                addr => addr.pickup_id === parseInt(e.target.value, 10)
                            );
                            setSelectedAddress(selected);
                        }}
                        disabled={loading}
                    >
                        {pickupAddresses.map(address => (
                            <option key={address.pickup_id} value={address.pickup_id}>
                                {address.street_name}, {address.landmark}, {address.city},
                                {address.state} - {address.pincode}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>No addresses found. Please add a delivery address.</p>
                )}

                <button onClick={handleAddNewAddress} disabled={loading}>
                    Add New Address
                </button>

                {isAddingAddress && (
                    <AddressForm
                        isEditing={false}
                        data={newAddress}
                        setData={setNewAddress}
                        onSubmit={handleAddressSubmit}
                        onCancel={() => setIsAddingAddress(false)}
                        loading={loading}
                    />
                )}

                {isEditingAddress && (
                    <AddressForm
                        isEditing={true}
                        data={editingAddress}
                        setData={setEditingAddress}
                        onSubmit={handleAddressSubmit}
                        onCancel={() => setIsEditingAddress(false)}
                        loading={loading}
                    />
                )}

                {pickupAddresses.map(address => (
                    <div key={address.pickup_id} className={styles.addressDisplay}>
                        <p>{address.street_name}, {address.landmark}</p>
                        <p>{address.city}, {address.state} - {address.pincode}</p>
                        <button
                            className={styles.editBtn}
                            onClick={() => {
                                setIsEditingAddress(true);
                                setEditingAddress({ ...address });
                            }}
                            disabled={loading}
                        >
                            Edit
                        </button>
                        <button
                            className={styles.deleteBtn}
                            onClick={() => handleDeleteAddress(address.pickup_id)}
                            disabled={loading}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.orderSummary}>
                <h3>Order Details</h3>
                <p>Total Items: {totalItems}</p>

                {cartItems.length > 0 ? (
                    <>
                        <table className={styles.cartTable}>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price/kg</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.item_id}>
                                        <td>{item.subcategory_name}</td>
                                        <td>₹{item.price_per_kg}</td>
                                        <td>{item.quantity_kg} kg</td>
                                        <td>₹{(item.price_per_kg * item.quantity_kg).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <p className={styles.total}>
                            Total Amount: ₹{totalPrice}
                        </p>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={!selectedAddress || loading}
                        >
                            Place Order
                        </button>
                    </>
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
        </div>
    );
};

export default SupplierOrderSummary;