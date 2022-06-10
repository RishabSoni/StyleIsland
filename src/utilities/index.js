import React from 'react';
import {
    ToastAndroid,
    TouchableOpacity,
    View,
    Text,
    Image,
    Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


export const checkEmpty = (...data) => {
    console.log(data, "<==data")
    for (let i = 0; i < data.length; i++) {
        if (!data[i]) return true;
    }
    return false;
}
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const checkEmail = (str) => {
    return emailRegex.test(str);
}

export const CompanyLogo = 'https://www.styleisland.com/templates/s-cart-light/assets/img/logo.png';
export const BaseUrl = 'https://www.styleisland.com';
export const RazorGetway = 'https://api.razorpay.com/v1/orders';
export const Authorization = `096c6df428df22aabae92dbd70d9b0ec`;
export const MainColor = '#fff';
export const ButtonColor = 'rgb(35, 44, 46)';
export const CommonBackground = 'rgb(241,236,231)';
export const TxtColor = '#000';
export const RazorKey = 'rzp_test_ZzrZ6owUIb8eye';
export const RazorSecret = 'Kka0DVAxO1ylRxrkymx3diiX';


export const displayToastMsg = (str) => {
    if (Platform.OS == 'android') {
        ToastAndroid.show(str, ToastAndroid.SHORT);
    } else {
        alert(ToastAndroid.SHORT)
    }

}

export const GetAuthData = async () => {
    try {
        const authData = await AsyncStorage.getItem('@auth');
        if (authData !== null) {
            return JSON.parse(authData);
        } else {
            return null;
        }
    } catch (e) {
        console.log(e)
    }
}

export const SetAuthData = async (token) => {
    try {
        const jsonValue = JSON.stringify(token)
        await AsyncStorage.setItem('@auth', jsonValue);
    } catch (e) {
        console.log(e)
    }
}

export const setLoggedIn = async function (isLogin) {
    await AsyncStorage.setItem('@loggedin', isLogin);
};

export const getLoggedIn = async function () {
    return await AsyncStorage.getItem('@loggedin');
};