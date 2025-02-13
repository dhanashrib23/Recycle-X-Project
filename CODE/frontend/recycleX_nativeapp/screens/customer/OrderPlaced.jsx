import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function OrderPlaced({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Animated Text */}
            <Animatable.Text
                animation="bounceIn"
                iterationCount={1} // Runs once
                duration={2000}
                style={styles.animatedText}
            >
                🎉 Order Placed Successfully! 🎉
            </Animatable.Text>

            {/* Order Details */}
            <Text style={styles.details}>Name: John Doe</Text>
            <Text style={styles.details}>Address: 123, Main Street, City</Text>
            <Text style={styles.details}>Delivery Date: 5th Feb 2025</Text>

            {/* Continue Shopping Button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('home')}>
                <Text style={styles.buttonText}>Continue Shopping</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    animatedText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#28a745',
        textAlign: 'center',
        marginBottom: 20,
    },
    details: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    button: {
        marginTop: 30,
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
