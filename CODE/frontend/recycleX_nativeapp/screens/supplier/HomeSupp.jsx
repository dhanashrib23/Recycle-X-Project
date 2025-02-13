import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, Button, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeSupp({ navigation }) {
    const { width, height } = Dimensions.get('window');
    const [rawMaterials, setRawMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [searchQuery, setSearchQuery] = useState('');

    const images = [
        { id: '1', url: require('../../assets/images/caroimg1.jpg') },
        { id: '2', url: require('../../assets/images/caroimg2.jpg') },
        { id: '3', url: require('../../assets/images/caroimg3.png') },
    ];

    const getImageSource = (imageName) => {
        const image = {
            "plastic.png": require("../../assets/recycled/plastic-granules.jpeg"),
            "metal.png": require("../../assets/recycled/metal.png"),
            "paper.png": require("../../assets/recycled/paper.png"),
            "glass.jpg": require("../../assets/recycled/glass.jpg"),
            "electrinics.jpg": require("../../assets/recycled/electrinics.jpg"),
            "rubber.jpg": require("../../assets/recycled/rubber.jpg"),
            "resins.png": require("../../assets/recycled/resins.png"),
            "biodegradable.jpg": require("../../assets/recycled/biodegradable.jpg"),
        };
        return image[imageName];
    };

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item.url} style={styles.image} />
        </View>
    );

    const goToSubcategory = (categoryId) => {
        navigation.navigate('subCategory', { categoryId });
    };

    const fetchRawMaterials = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                Alert.alert('Authentication Error', 'Token not found, please login again.');
                return;
            }
            const response = await axios.get('http://172.28.96.1:5000/common/getAllTrashCategories', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRawMaterials(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'There was an error fetching raw materials. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => { fetchRawMaterials(); }, []);

    // const filteredMaterials = rawMaterials.filter(item =>
    //     item.rp_category_name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text>Loading raw materials...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.carouselContainer}>
                <Carousel
                    data={images}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width - 60}
                    loop={true}
                    autoplay={true}
                />
            </View>

            {/* <TextInput
                style={styles.searchBar}
                placeholder="Search Products..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            /> */}

            <FlatList
                // data={filteredMaterials}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.flatListContainer}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('details', { item })}>
                        <Image source={getImageSource(item.image_name)} style={styles.cardImage} />
                        <Text style={styles.cardText}>{item.category_name}</Text>
                        <Text style={styles.cardText}>{item.category_description}</Text>
                        <Button title="Show Products" onPress={() => goToSubcategory(item.category_id)} />
                    </TouchableOpacity>
                )}
            />

            <Button title="Show All Products" onPress={() => navigation.navigate('allSubcategory')} />

            <Button title="Go to Cart" onPress={() => navigation.navigate('cart')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#f5f5f5',
    },
    carouselContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        height: Dimensions.get('window').height / 3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    searchBar: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        margin: 10,
        backgroundColor: '#fff',
    },
    flatListContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    row: {
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignSelf: 'stretch',
    },
    cardImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    cardText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
