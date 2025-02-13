import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';

// Sample order data
const sampleOrders = [
    { id: 1, date: '2025-02-01', status: 'Delivered', items: ['Item 1', 'Item 2'], totalPrice: 200 },
    { id: 2, date: '2025-01-28', status: 'Delivered', items: ['Item 3'], totalPrice: 100 },
    { id: 3, date: '2025-02-03', status: 'Pending', items: ['Item 1'], totalPrice: 50 },
    { id: 4, date: '2024-12-15', status: 'Delivered', items: ['Item 2', 'Item 4'], totalPrice: 300 },
    // More orders can be added here
];

const OrderPage = ({ navigation }) => {
    const [recentOrders, setRecentOrders] = useState([]);
    const [previousOrders, setPreviousOrders] = useState([]);

    // Fetch orders and categorize them into recent and previous
    useEffect(() => {
        const recent = sampleOrders.filter(order => new Date(order.date) > new Date('2025-01-01'));
        const previous = sampleOrders.filter(order => new Date(order.date) <= new Date('2025-01-01'));

        setRecentOrders(recent);
        setPreviousOrders(previous);
    }, []);

    // Render a single order item
    const renderOrderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <Text style={styles.orderText}>Order ID: {item.id}</Text>
            <Text style={styles.orderText}>Date: {item.date}</Text>
            <Text style={styles.orderText}>Status: {item.status}</Text>
            <Text style={styles.orderText}>Items: {item.items.join(', ')}</Text>
            <Text style={styles.orderText}>Total Price: ₹{item.totalPrice}</Text>
            <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={() => navigation.navigate('OrderSummary', { orderId: item.id })}
            >
                <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            {/* Recent Orders */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Orders</Text>
                <FlatList
                    data={recentOrders}
                    renderItem={renderOrderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>

            {/* Previous Orders */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Previous Orders</Text>
                <FlatList
                    data={previousOrders}
                    renderItem={renderOrderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </ScrollView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    orderItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    orderText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    viewDetailsButton: {
        marginTop: 10,
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    viewDetailsText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default OrderPage;
