import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { CartContext } from '../../context/CartContext';

export default function Payment({ navigation }) {
    const { cartItems, clearCart } = useContext(CartContext);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    // Handle Payment
    const handlePayment = () => {
        if (!paymentMethod) {
            alert("Please select a payment method");
            return;
        }
        setShowModal(true);  // Show confirmation popup
    };

    // Confirm Order and Navigate to Order Placed Page
    const confirmOrder = () => {
        setShowModal(false);
        clearCart();
        navigation.navigate('orderPlaced');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Payment Method</Text>

            {/* Payment Options */}
            <TouchableOpacity
                style={[styles.option, paymentMethod === 'UPI' && styles.selected]}
                onPress={() => setPaymentMethod('UPI')}
            >
                <Text style={styles.optionText}>UPI Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.option, paymentMethod === 'Cash on Delivery' && styles.selected]}
                onPress={() => setPaymentMethod('Cash on Delivery')}
            >
                <Text style={styles.optionText}>Cash on Delivery</Text>
            </TouchableOpacity>

            {/* Price Summary */}
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total Price: ₹{totalPrice}</Text>
            </View>

            {/* Pay Now Button */}
            <TouchableOpacity
                style={styles.payButton}
                onPress={handlePayment}
            >
                <Text style={styles.buttonText}>Place Order</Text>
            </TouchableOpacity>

            {/* Confirmation Popup Modal */}
            <Modal visible={showModal} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Confirm Your Order</Text>
                        <Text style={styles.modalText}>Are you sure you want to place this order?</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmButton} onPress={confirmOrder}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    option: { padding: 15, backgroundColor: '#fff', borderRadius: 5, marginBottom: 10, alignItems: 'center' },
    selected: { backgroundColor: '#3498db' },
    optionText: { fontSize: 16, fontWeight: 'bold' },
    totalContainer: { padding: 15, backgroundColor: '#fff', marginTop: 10, borderRadius: 5 },
    totalText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
    payButton: { marginTop: 20, padding: 15, backgroundColor: '#2ecc71', borderRadius: 5, alignItems: 'center' },
    buttonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalBox: { width: 300, padding: 20, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    modalText: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    cancelButton: { flex: 1, backgroundColor: '#e74c3c', padding: 10, borderRadius: 5, alignItems: 'center', marginRight: 5 },
    confirmButton: { flex: 1, backgroundColor: '#2ecc71', padding: 10, borderRadius: 5, alignItems: 'center', marginLeft: 5 }
});
