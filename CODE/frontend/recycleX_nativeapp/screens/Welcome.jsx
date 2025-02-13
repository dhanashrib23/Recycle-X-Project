import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Welcome({ navigation }) {
    return (
        <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
            <Text style={styles.headerText}>Welcome</Text>
            <Text style={styles.subHeaderText}>Choose your role to proceed</Text>

            <View style={styles.boxContainer}>
                {/* Customer Box */}
                <TouchableOpacity
                    style={styles.box}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("customerLogin", { role: 'cunsumer' })}
                >
                    <Image source={require('../assets/customer.png')} style={styles.image} />
                    <Text style={styles.boxText}>Customer</Text>
                </TouchableOpacity>

                {/* Supplier Box */}
                <TouchableOpacity
                    style={styles.box}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("supplierLogin", { role: 'supplier' })}
                >
                    <Image source={require('../assets/supplier.png')} style={styles.image} />
                    <Text style={styles.boxText}>Supplier</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    subHeaderText: {
        fontSize: 18,
        color: '#ddd',
        marginBottom: 40,
        textAlign: 'center',
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingVertical: 20,
        width: width * 0.4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    boxText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4facfe',
    },
});
