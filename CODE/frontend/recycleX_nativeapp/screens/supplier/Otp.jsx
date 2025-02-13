import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Otp = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const navigation = useNavigation();  // Ensure navigation is available

    const handleSendOTP = () => {
        console.log(`Sending OTP to ${phoneNumber}`);
        setOtp('123456');  // Hardcoded OTP for testing
    };

    const handleVerifyOTP = () => {
        console.log(`Verifying OTP: ${otp}`);
        alert('OTP Verified!');

        // Check if navigation works as expected
        console.log('Navigating to supplierLogin...');
        navigation.navigate('supplierLogin');
    };

    return (
        <View style={styles.container}>
            <Text>OTP Generation</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <Button title="Send OTP" onPress={handleSendOTP} />

            {otp && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter OTP"
                        keyboardType="numeric"
                        value={otp}
                        onChangeText={setOtp}
                    />
                    <Button title="Verify OTP" onPress={handleVerifyOTP} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default Otp;
