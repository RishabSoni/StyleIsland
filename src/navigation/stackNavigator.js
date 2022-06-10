import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Cart from '../screens/Cart';
import DashBoard from '../screens/Dashboard';
import Welcome from '../screens/Welcome';
import Profile from '../screens/Profile';
import Checkout from '../screens/Checkout';
import ForgotPassword from '../screens/ForgotPassword';
import Categories from '../screens/Categories';
import ShopDetails from '../screens/ShopDetails';
import ProductList from '../screens/ProductList';
import ProductDetails from '../screens/ProductDetails';
import Contacts from '../screens/Contacts';
import { MyTabNavigator } from './tabNavigation';


const Stack = createStackNavigator();

export const ShopScreen = () => (
    <Stack.Navigator initialRouteName='Categories' headerMode='none'>
        <Stack.Screen name='Categories' component={Categories} />
        <Stack.Screen name='ShopDetails' component={ShopDetails} />
        <Stack.Screen name='ProductList' component={ProductList} />  
    </Stack.Navigator>
)

export const RootStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Contacts' headerMode='none'>
            <Stack.Screen name='Contacts' component={Contacts} />
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='DashBoard' component={MyTabNavigator} />
            <Stack.Screen name='Checkout' component={Checkout} />
            <Stack.Screen name='ProductList' component={ProductList} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            <Stack.Screen name='ProductDetails' component={ProductDetails} />
        </Stack.Navigator>
    )
}

