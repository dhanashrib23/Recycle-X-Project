import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';




import Welcome from './Welcome';
import Login from './supplier/Login';
import Signup from './supplier/Signup';
import CustLogin from './customer/CustLogin';
import CustSignup from './customer/CustSignup';
import Home from './customer/Home';
import About from './customer/About';
import Order from './customer/Order';
import Profile from './customer/Profile';
import OtpGenPage from './customer/OtpGenPage';
import Details from './customer/Details';
import { CartProvider } from '../context/CartContext';
import Cart from './customer/Cart';
import OrderSummary from './customer/OrderSummary';
import Payment from './customer/Payment';
import OrderPlaced from './customer/OrderPlaced';
import HomeSupp from './supplier/HomeSupp';
import Otp from './supplier/Otp';
import Subcategory from './customer/SubCategory';


var Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Custom Header with Hamburger, Company Name & Profile Icon
function CustomHeader({ navigation }) {
    return (
        <View style={styles.header}>
            {/* Hamburger Menu */}
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.hamburgerIcon}>
                <Text style={styles.hamburgerText}>☰</Text>
            </TouchableOpacity>

            {/* Company Name */}
            <Text style={styles.companyName}>RecycleX</Text>

            {/* Sell Button */}
            <TouchableOpacity onPress={() => navigation.navigate('supplierHome')} style={styles.sellButton}>
                <Text style={styles.sellButtonText}>Sell Scarp</Text>
            </TouchableOpacity>

            {/* Profile Icon */}
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileIcon}>
                <Image source={require('../assets/avatar.png')} style={styles.profileImage} />
            </TouchableOpacity>
        </View>
    );
}


function HomeDrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Home" screenOptions={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} />, // Custom Header
        })}>
            <Drawer.Screen name="Home" component={Home} />

            <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="My Cart" component={Cart} />
            <Drawer.Screen name="My Orders" component={Order} />
            <Drawer.Screen name="Profile" component={Profile} />


        </Drawer.Navigator>
    );
}

function Launcher() {

    return (
        <CartProvider>
            <NavigationContainer>
                <Stack.Navigator >
                    <Stack.Screen name='welcome' component={Welcome}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name='supplierLogin' component={Login}
                        options={{ headerTitle: '', headerBackTitleVisible: false }} />

                    <Stack.Screen name='supplierSignup' component={Signup}
                        options={{ headerTitle: '', headerBackTitleVisible: false }} />

                    <Stack.Screen name='customerLogin' component={CustLogin}
                        options={{ headerTitle: '', headerBackTitleVisible: false }} />

                    <Stack.Screen name='customerSignup' component={CustSignup}
                        options={{ headerTitle: '', headerBackTitleVisible: false }} />

                    <Stack.Screen name='otpGenPage' component={OtpGenPage}
                        options={{ headerTitle: '', headerBackTitleVisible: false }} />

                    <Stack.Screen name='otp' component={Otp}
                        options={{ headerTitle: '', headerBackTitleVisible: false }} />

                    <Stack.Screen name="home" component={HomeDrawerNavigator} options={{ headerShown: false }} />

                    <Stack.Screen name="details" component={Details} options={{ headerTitle: '', headerBackTitleVisible: false }} />

                    <Stack.Screen name="cart" component={Cart} options={{ headerTitle: '', headerBackTitleVisible: false }} />

                    <Stack.Screen name="orderSummary" component={OrderSummary} options={{ headerTitle: '', headerBackTitleVisible: false }} />

                    <Stack.Screen name="payment" component={Payment} options={{ headerTitle: '', headerBackTitleVisible: false }} />

                    <Stack.Screen name="orderPlaced" component={OrderPlaced} options={{ headerTitle: '', headerBackTitleVisible: false }} />

                    <Stack.Screen name="supplierHome" component={HomeSupp} options={{ headerTitle: '', headerBackTitleVisible: false }} />

                    <Stack.Screen name="subCategory" component={Subcategory} options={{ headerTitle: '', headerBackTitleVisible: false }} />

                    <Stack.Screen name="allSubcategory" component={Subcategory} options={{ headerTitle: '', headerBackTitleVisible: false }} />



                </Stack.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
}

// Styles
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#2196F3',
        paddingTop: 30,
    },
    hamburgerIcon: {
        padding: 10,
    },
    hamburgerText: {
        fontSize: 30,
        color: '#fff',
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    sellButton: {
        backgroundColor: '#ffcc00', // Yellow button
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,

    },
    sellButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    profileIcon: {
        padding: 10,
        paddingLeft: 0,
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
});




export default Launcher;