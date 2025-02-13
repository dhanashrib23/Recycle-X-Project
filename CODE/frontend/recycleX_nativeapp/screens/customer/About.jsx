import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const About = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>About Us</Text>

                <Text style={styles.description}>
                    Welcome to RecykelX! We are dedicated to making the world a cleaner, greener place
                    by helping individuals and businesses recycle their waste and turn it into reusable
                    raw materials. Our platform makes recycling easy, efficient, and profitable for
                    everyone involved. Whether you're a business looking to recycle or a consumer
                    wanting to dispose of waste, we're here to help you make a positive impact on the
                    environment.
                </Text>

                <Text style={styles.subtitle}>Our Mission</Text>
                <Text style={styles.description}>
                    Our mission is to provide a sustainable solution for waste management by enabling
                    efficient recycling practices. We aim to create a circular economy where waste
                    materials are processed and transformed into valuable resources.
                </Text>

                <Text style={styles.subtitle}>Contact Us</Text>
                <Text style={styles.contactInfo}>
                    Email: support@recykelx.com
                </Text>
                <Text style={styles.contactInfo}>
                    Phone: +1-234-567-890
                </Text>
                <Text style={styles.contactInfo}>
                    Address: 123 Green St, Recycling City, Country
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    contactInfo: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
});

export default About;
