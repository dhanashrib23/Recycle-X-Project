import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Subcategory = ({ route }) => {
    const categoryId = route?.params?.categoryId;
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState({});

    useEffect(() => {
        if (categoryId) {
            fetchSubcategories();
        }
    }, [categoryId]);

    const fetchSubcategories = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                console.error('Token not found, please log in again.');
                return;
            }
            const response = await axios.get(`http://172.28.96.1:5000/common/getRecySubCategoriesByCatId/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSubcategories(response.data.data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = (id, change) => {
        setCart((prevCart) => {
            const newQuantity = (prevCart[id] || 0) + change;
            return { ...prevCart, [id]: newQuantity >= 0 ? newQuantity : 0 };
        });
    };

    const addToCart = async (subCategoryId, quantity) => {
        const consumerId = await AsyncStorage.getItem('consumerId');  // Retrieve the consumerId from AsyncStorage
        const token = await AsyncStorage.getItem('authToken');  // Retrieve the authentication token

        if (!consumerId || !token) {
            Alert.alert('Error', 'Please log in to add items to your cart.');
            return;
        }

        try {

            console.log("Sending data to add to cart:", {
                consumer_id: consumerId,
                subCategoryId: subCategoryId,
                quantity: quantity,
            });

            const response = await axios.post(
                `http://172.28.96.1:5000/consumer/addcart/${subCategoryId}`,
                {
                    consumer_id: consumerId,
                    quantity: quantity,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                Alert.alert('Success', 'Item added to cart!');
            }
        } catch (error) {
            console.log('Error adding to cart:', error?.response?.data || error.message);
            Alert.alert('Error', 'There was an error adding the item to your cart.');
        }
    };


    if (!categoryId) {
        return <Text style={styles.errorText}>Category ID is missing.</Text>;
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={subcategories}
                keyExtractor={(item) => item.subcategory_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: `http://172.28.96.1:5000/common/getRecySubCategoriesByCatId/${categoryId}/${item.subcategory_image}` }} style={styles.image} />
                        <Text style={styles.title}>{item.subcategory_name}</Text>
                        <Text style={styles.description}>{item.category_description}</Text>
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
                        <Button title="Add to Cart" onPress={() => addToCart(item.subcategory_id, cart[item.subcategory_id] || 0)} color="#27ae60" />
                    </View>
                )}
            />
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

export default Subcategory;
