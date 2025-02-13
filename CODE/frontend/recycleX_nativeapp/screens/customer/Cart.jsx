import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CartContext } from '../../context/CartContext';

export default function Cart({ navigation }) {
    const { cartItems } = useContext(CartContext);
    const { width, height } = Dimensions.get('window');

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>

            {cartItems.length === 0 ? (
                <Text style={styles.emptyText}>Your cart is empty</Text>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ flex: 1 }}
                        contentContainerStyle={{ paddingBottom: 100 }} // Ensures space for buttons
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <Image source={item.image} style={styles.image} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text>Quantity: {item.quantity} kg</Text>
                                    <Text>Total: ₹{item.quantity * item.price}</Text>
                                </View>
                            </View>
                        )}
                        ListFooterComponent={() => (
                            <View style={styles.totalContainer}>
                                <Text style={styles.totalText}>Total Price: ₹{totalPrice}</Text>
                            </View>
                        )}
                    />
                </>
            )}

            {/* Buttons Fixed at the Bottom */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('home')}>
                    <Text style={styles.buttonText}>Continue Shopping</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.placeOrderButton}
                    onPress={() => navigation.navigate('orderSummary')}
                >
                    <Text style={styles.buttonText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    emptyText: { fontSize: 18, color: '#666', textAlign: 'center', marginTop: 50 },
    cartItem: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', marginBottom: 10, borderRadius: 5 },
    image: { width: 60, height: 60, marginRight: 10, borderRadius: 5 },
    itemDetails: { flex: 1 },
    name: { fontSize: 18, fontWeight: 'bold' },
    totalContainer: { padding: 15, backgroundColor: '#fff', marginTop: 10, borderRadius: 5 },
    totalText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },

    // Fix buttons to the bottom
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white', // Ensure visibility
        padding: 1,
        borderRadius: 10,
        elevation: 3, // Shadow effect for Android
        shadowColor: '#000', // Shadow effect for iOS
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 60,
    },
    button: { flex: 1, padding: 12, backgroundColor: '#3498db', borderRadius: 5, alignItems: 'center', marginRight: 5 },
    placeOrderButton: { flex: 1, padding: 12, backgroundColor: '#2ecc71', borderRadius: 5, alignItems: 'center', marginLeft: 5 },
    buttonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
});
