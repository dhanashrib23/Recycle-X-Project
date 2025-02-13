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

export default function Login({ navigation }) {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);  // Corrected position

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/supplier/signin', { mobileNumber: mobileNumber, password, role: 'supplier' });
            if (response.status === 200) {
                Alert.alert('Login Successful');
                navigation.navigate('home');
            }
        } catch (error) {
            Alert.alert(error.response?.data?.error || 'Login failed');
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
                    placeholder="Enter Mobile Number"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
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
                <Text style={styles.registerLink} onPress={() => navigation.navigate("supplierSignup")}>Sign Up</Text>
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
