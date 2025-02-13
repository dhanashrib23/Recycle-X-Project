import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Profile = ({ navigation }) => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        state: '',
        city: '',
        pincode: '',
        imageName: '',
        type: '',
    });
    const [loading, setLoading] = useState(true);

    const fetchProfileData = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const token = await AsyncStorage.getItem('authToken');  // Get token to authenticate API request

            if (!email || !token) {
                Alert.alert('Error', 'Please log in again.');
                return;
            }

            // Fetch consumer details using the email
            const consumerResponse = await axios.get(
                'http://172.28.96.1:5000/consumer/email',
                {
                    params: { email },  // send email as a query parameter
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (consumerResponse.status === 200) {
                const consumerData = consumerResponse.data.data;
                const {
                    first_name, last_name, email, mobile_number,
                    state, city, pincode, imageName, type
                } = consumerData;

                // Store data in AsyncStorage
                await AsyncStorage.setItem('first_name', first_name);
                await AsyncStorage.setItem('last_name', last_name);
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('mobile_number', mobile_number);
                await AsyncStorage.setItem('state', state);
                await AsyncStorage.setItem('city', city);
                await AsyncStorage.setItem('pincode', pincode);
                await AsyncStorage.setItem('imageName', imageName);
                await AsyncStorage.setItem('type', type);

                console.log('Data stored in AsyncStorage:', {
                    first_name, last_name, email, mobile_number, state, city, pincode, imageName, type
                });

                // Set profile state for display
                setProfile({
                    firstName: first_name,
                    lastName: last_name,
                    email: email,
                    mobileNumber: mobile_number,
                    state: state,
                    city: city,
                    pincode: pincode,
                    imageName: imageName,
                    type: type,
                });
            } else {
                Alert.alert('Error', 'Failed to fetch consumer details');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            Alert.alert('Error', 'Failed to fetch profile data.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch profile data on page load
    useEffect(() => {
        fetchProfileData();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    const address = `${profile.city}, ${profile.state}, ${profile.pincode}`;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: `http://172.28.96.1:5000/${profile.imageName}` }} // Image URL based on imageName
                    style={styles.profileImage}
                />
                <Text style={styles.name}>{profile.firstName} {profile.lastName}</Text>
                <Text style={styles.email}>{profile.email}</Text>
                <Text style={styles.mobileNumber}>{profile.mobileNumber}</Text>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.type}>{profile.type}</Text>
            </View>

            <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>

            <View style={styles.logoutContainer}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={async () => {
                        await AsyncStorage.clear();
                        navigation.replace('Login');
                    }}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginVertical: 10,
    },
    mobileNumber: {
        fontSize: 16,
        color: '#666',
        marginVertical: 5,
    },
    address: {
        fontSize: 16,
        color: '#666',
        marginVertical: 5,
    },
    type: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#27ae60',
        marginTop: 10,
    },
    editButton: {
        position: 'absolute',
        top: 30,
        right: 20,
        backgroundColor: '#27ae60',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 12,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Profile;
