import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';


export default function CustSignup({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [consumerType, setConsumerType] = useState('Individual');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    //validation
    const validateInputs = () => {
        if (!firstName || !lastName || !email || !mobileNumber || !password || !state || !city || !pincode) {
            alert("All fields are required!");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Enter a valid email!");
            return false;
        }
        if (!/^\d{10}$/.test(mobileNumber)) {
            alert("Enter a valid 10-digit mobile number!");
            return false;
        }
        if (!/^\d{6}$/.test(pincode)) {
            alert("Enter a valid 6-digit pincode!");
            return false;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return false;
        }
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return false;
        }
        return true;
    };

    const handleSignup = async () => {
        if (!validateInputs()) return;

        // Encrypt password


        // Define the signup data inside the function
        const signupData = {
            firstName,
            lastName,
            email,
            mobileNumber,
            password,
            state,
            city,
            pincode,
            consumerType,
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/consumer/signup",
                signupData,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 201) {
                alert("Registration Successful");
                navigation.navigate("otpGenPage");
            } else {
                alert("Signup failed: " + response.data.message);
            }
        } catch (error) {
            console.error("Signup error: ", error);
            alert(error.response?.data?.message || "Signup request failed.");
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.headerText}>Register</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} keyboardType="email-address" value={email} onChangeText={setEmail} />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Mobile Number</Text>
                    <TextInput style={styles.input} keyboardType="numeric" value={mobileNumber} onChangeText={setMobileNumber} />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput style={styles.input} secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#aaa" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput style={styles.input} secureTextEntry={!showConfirmPassword} value={confirmPassword} onChangeText={setConfirmPassword} />
                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="#aaa" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>State</Text>
                    <TextInput style={styles.input} value={state} onChangeText={setState} />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>City</Text>
                    <TextInput style={styles.input} value={city} onChangeText={setCity} />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Pincode</Text>
                    <TextInput style={styles.input} keyboardType="numeric" value={pincode} onChangeText={setPincode} />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Consumer Type</Text>
                    <View style={styles.radioContainer}>
                        <TouchableOpacity style={[styles.radioButton, consumerType === 'Individual' && styles.radioSelected]} onPress={() => setConsumerType('Individual')}>
                            <Text style={styles.radioText}>Individual</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.radioButton, consumerType === 'Organization' && styles.radioSelected]} onPress={() => setConsumerType('Organization')}>
                            <Text style={styles.radioText}>Organization</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.radioButton, consumerType === 'Government' && styles.radioSelected]} onPress={() => setConsumerType('Government')}>
                            <Text style={styles.radioText}>Government</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    scrollContainer: { padding: 20 },
    headerText: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    formGroup: { marginBottom: 15 },
    label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
    input: { backgroundColor: '#fff', borderRadius: 8, padding: 10, fontSize: 16, borderWidth: 1, borderColor: '#ddd' },
    passwordContainer: { flexDirection: 'row', alignItems: 'center' },
    eyeIcon: { position: 'absolute', right: 15 },
    radioContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
    radioButton: { padding: 10, borderWidth: 1, borderRadius: 8, borderColor: '#ddd', flex: 1, alignItems: 'center', marginHorizontal: 5 },
    radioSelected: { backgroundColor: '#007bff', borderColor: '#007bff' },
    radioText: { fontSize: 16 },
    button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
