import React, { useState, useContext } from 'react';
import {
    View, Text, TextInput, FlatList, Image, TouchableOpacity,
    StyleSheet, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { CartContext } from '../../context/CartContext';

export default function OrderSummary({ navigation }) {
    const { cartItems } = useContext(CartContext);
    const [address, setAddress] = useState('');

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Order Summary</Text>

                    {/* Address Input */}
                    <View style={styles.addressContainer}>
                        <Text style={styles.label}>Delivery Address:</Text>
                        <TextInput
                            style={styles.input}
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Enter your address"
                        />
                    </View>

                    {/* Order Items List */}
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <Image source={item.image} style={styles.image} />
                                <View>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text>Quantity: {item.quantity} kg</Text>
                                    <Text>Total: ₹{item.quantity * item.price}</Text>
                                </View>
                            </View>
                        )}
                        scrollEnabled={false} // Ensures FlatList doesn't interfere with ScrollView
                    />

                    {/* Total Price Section */}
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total Price: ₹{totalPrice}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Button Outside ScrollView to Ensure Visibility */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('payment')}
                >
                    <Text style={styles.buttonText}>Continue to Payment</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1, paddingBottom: 100 },  // Ensures scrolling works well
    container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    addressContainer: { padding: 10, backgroundColor: '#fff', borderRadius: 5, marginBottom: 10 },
    label: { fontSize: 16, fontWeight: 'bold' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 5, marginTop: 5 },
    cartItem: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', marginBottom: 10, borderRadius: 5 },
    image: { width: 60, height: 60, marginRight: 10, borderRadius: 5 },
    name: { fontSize: 18, fontWeight: 'bold' },
    totalContainer: { padding: 10, backgroundColor: '#fff', marginTop: 10, borderRadius: 5 },
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

    buttonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
});
