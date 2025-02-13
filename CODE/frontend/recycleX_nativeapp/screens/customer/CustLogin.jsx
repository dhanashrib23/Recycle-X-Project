import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustLogin({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);



    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/consumer/signin', {
                email,
                password,
                role: 'consumer',
            });

            console.log("Login Response:", response.data); // ✅ Log the response

            const { token } = response.data;

            if (!token) {
                console.error("Token is missing in response");
                Alert.alert("Login Failed", "Authentication token not received from server.");
                return;
            }

            await AsyncStorage.setItem('authToken', token); // ✅ Store token only
            console.log('✅ Stored Token:', token);

            // Fetch consumer details using the email after successful login
            const consumerResponse = await axios.get(
                'http://172.18.0.1:5000/consumer/email',
                {
                    params: { email },  // send email as a query parameter
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (consumerResponse.status === 200) {
                const consumerId = consumerResponse.data.data.id;
                console.log("Consumer ID:", consumerId);

                // Store consumerId in AsyncStorage (or pass it to context/state)
                await AsyncStorage.setItem('consumerId', consumerId.toString());
                console.log(' Stored Consumer ID:', consumerId);

                // Navigate to home page
                navigation.navigate('home');
            } else {
                Alert.alert('Consumer Details Fetch Failed', 'Could not fetch consumer details.');
            }

        } catch (error) {
            console.log(' Error logging in:', error?.response?.data?.error || error.message);
            Alert.alert('Login Failed', error?.response?.data?.error || 'Something went wrong');
        }
    };





    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Welcome Back</Text>
                <Text style={styles.subHeaderText}>Login to your account</Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={!showPassword}
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#aaa" />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account? </Text>
                <Text style={styles.registerLink} onPress={() => navigation.navigate("customerSignup")}>Sign Up</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', justifyContent: 'center', alignItems: 'center' },
    headerText: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    formGroup: { width: '85%', marginBottom: 15 },
    label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
    input: { backgroundColor: '#fff', borderRadius: 8, padding: 10, fontSize: 16, borderWidth: 1, borderColor: '#ddd', width: '100%' },
    passwordContainer: { flexDirection: 'row', alignItems: 'center', position: 'relative' },
    eyeIcon: { position: 'absolute', right: 15 },
    button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10, width: '85%' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    registerContainer: { flexDirection: 'row', marginTop: 20 },
    registerText: { color: '#000' },
    registerLink: { color: '#007bff', fontWeight: 'bold' },
});
