import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllSubcategory = ({ navigation }) => {
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState({});

    useEffect(() => {
        fetchSubcategories();
    }, []);

    const fetchSubcategories = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                console.error('Token not found, please log in again.');
                Alert.alert("Authentication Error", "Please log in again.");
                return;
            }

            const response = await axios.get(`http://172.28.96.1:5000/common/getAllRecyclingSubCategories`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("API Response:", response.data); // Debugging

            if (response.data.status === 200 && Array.isArray(response.data.data)) {
                setSubcategories(response.data.data);
            } else {
                console.warn("Unexpected API response format:", response.data);
                setSubcategories([]);
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error.response?.data || error.message);
            Alert.alert("Error", "Failed to fetch subcategories.");
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = (id, change) => {
        setCart(prevCart => {
            const newQuantity = (prevCart[id] || 0) + change;
            return { ...prevCart, [id]: newQuantity >= 0 ? newQuantity : 0 };
        });
    };

    const addToCart = async (item) => {
        if (!cart[item.subcategory_id] || cart[item.subcategory_id] <= 0) {
            Alert.alert('Error', 'Please select a valid quantity.');
            return;
        }

        const newCart = { ...cart, [item.subcategory_id]: cart[item.subcategory_id] };
        await AsyncStorage.setItem('cart', JSON.stringify(newCart));
        Alert.alert('Success', `${item.subcategory_name} added to cart!`);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            {subcategories.length === 0 ? (
                <Text style={styles.errorText}>No subcategories available.</Text>
            ) : (
                <FlatList
                    data={subcategories}
                    keyExtractor={(item) => item.subcategory_id?.toString() || Math.random().toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image
                                source={{ uri: `http://172.28.96.1:5000/common/getAllRecyclingSubCategories/${item.subcategory_image}` }}
                                style={styles.image}
                            />
                            <Text style={styles.title}>{item.subcategory_name}</Text>
                            <Text style={styles.description}>{item.category_description || "No description available"}</Text>
                            <Text style={styles.price}>Price per kg: ₹{item.price_per_kg}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => updateQuantity(item.subcategory_id, -1)}>
                                    <Text style={styles.buttonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{cart[item.subcategory_id] || 0} kg</Text>
                                <TouchableOpacity style={styles.button} onPress={() => updateQuantity(item.subcategory_id, 1)}>
                                    <Text style={styles.buttonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <Button title="Add to Cart" onPress={() => addToCart(item)} color="#27ae60" />
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'red',
        marginTop: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#27ae60',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#27ae60',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AllSubcategory;
