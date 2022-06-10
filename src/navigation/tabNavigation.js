import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashBoard from '../screens/Dashboard';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import { ShopScreen } from './stackNavigator';


const Tab = createBottomTabNavigator();

export const MyTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='DashBoard' component={DashBoard} />
            <Tab.Screen name='Shop' component={ShopScreen} />
            <Tab.Screen name='Bag' component={DashBoard} />
            <Tab.Screen name='Account' component={Profile} />
        </Tab.Navigator>
    )
}

//5241 9352 0598 1009