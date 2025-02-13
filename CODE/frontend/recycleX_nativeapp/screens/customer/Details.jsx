import React, { useState, useContext } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CartContext } from '../../context/CartContext';

export default function Details({ route, navigation }) {
    const { item } = route.params;
    const { addToCart } = useContext(CartContext); // Access cart context
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const handleAddToCart = () => {
        addToCart({ ...item, quantity }); // Add item with quantity to cart
        alert(`${quantity} kg of ${item.name} added to cart!`);
        navigation.navigate('home'); // Navigate back to Home
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>Price: ₹{item.price} per kg</Text>

            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.button}><Text>-</Text></TouchableOpacity>
                <Text style={styles.quantity}>{quantity} kg</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.button}><Text>+</Text></TouchableOpacity>
            </View>

            <Button title="Add to Cart" onPress={handleAddToCart} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, alignItems: 'center', backgroundColor: '#f4f4f4' },
    image: { width: 200, height: 200, marginBottom: 10 },
    name: { fontSize: 22, fontWeight: 'bold' },
    description: { fontSize: 16, textAlign: 'center', marginVertical: 10, color: '#555' },
    price: { fontSize: 18, marginVertical: 10 },
    quantityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
    button: { padding: 10, backgroundColor: '#ddd', marginHorizontal: 10, borderRadius: 5 },
    quantity: { fontSize: 18 },
});
