import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonColor, setLoggedIn, TxtColor, BaseUrl } from '../utilities';

const { width, height } = Dimensions.get('window');
export default class Profile extends Component {

    redirectScreen = (type) => {
        if (type == 'FAQs') {
            this.props.navigation.navigate('InfoWeb', { url: `${BaseUrl}/faqs` })
        } else if (type == 'Shipping') {
            this.props.navigation.navigate('InfoWeb', { url: `${BaseUrl}/store-locator` })
        } else if (type == 'About Us') {
            this.props.navigation.navigate('InfoWeb', { url: `${BaseUrl}/our-story` })
        } else if (type == 'Profile') {
            this.props.navigation.navigate('Profile')
        } else if (type == 'Address Book') {
            this.props.navigation.navigate('MyAddresses')
        } else if (type == 'My Orders') {
            this.props.navigation.navigate('MyOrders')
        } else if (type == 'Wishlish') {
            this.props.navigation.navigate('MyWishList')
        } else {
            this.props.navigation.navigate('InfoWeb', { url: `${BaseUrl}/contact` })
        }
    }

    logOut = async () => {
        setLoggedIn('false')
        await AsyncStorage.removeItem('@auth');

        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login', screen: 'Login' }]
        })
    }

    renderRow = ({ item, i }) => {
        return (
            <TouchableOpacity onPress={() => this.redirectScreen(item)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 45, paddingHorizontal: 10, backgroundColor: '#fff' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Gill Sans Medium' }}> {item} </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name='chevron-forward-outline' size={18} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        const seperator = () => (
            <View
                style={{
                    backgroundColor: ButtonColor,
                    height: 0.5,
                    width: '100%'
                }}
            />
        );

        return (
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../assets/SI_Logo-12.png')}
                                style={{ width: 150, height: 85 }} />
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <View style={styles.cardContainer}>
                                <View style={{ width: '100%', paddingLeft: 15, paddingBottom: 5 }}>
                                    <Text style={{ fontFamily: 'Gill Sans Medium', fontSize: 18 }}>
                                        Account Information
                        </Text>
                                </View>
                                <FlatList
                                    data={['Address Book', 'Wishlish', 'My Orders']}
                                    keyExtractor={(item, i) => i.toString()}
                                    renderItem={this.renderRow}
                                    ItemSeparatorComponent={seperator}
                                />
                            </View>

                            <View style={styles.cardContainer}>
                                <View style={{ width: '100%', paddingLeft: 15, paddingBottom: 5 }}>
                                    <Text style={{ fontFamily: 'Gill Sans Medium', fontSize: 18 }}>
                                        Info
                        </Text>
                                </View>
                                <FlatList
                                    data={['FAQs', 'Shipping', 'Returns', 'About Us', 'Contact Us']}
                                    keyExtractor={(item, i) => i.toString()}
                                    renderItem={this.renderRow}
                                    ItemSeparatorComponent={seperator}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 0.1 }}>
                            <FormButton title='SIGN OUT'
                                style={styles.logOutBtn}
                                onClick={this.logOut}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    cardContainer: {
        flex: 1,
        elevation: 2,
        width: '100%',
        paddingVertical: 25
        // backgroundColor: 'red',
        //  alignItems: 'center'
    },
    reportContainer: {
        width: '90%',

        //flex:1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        //height: 100,
        borderRadius: 8,
        elevation: 1,
        justifyContent: 'space-between'
    },
    iconContainer: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 2,
    },
    logOutBtn: {
        padding: 15,
        width: width / 2,
        alignSelf: 'center',
        backgroundColor: '#000',
        alignItems: 'center',
        borderRadius: 0,
        marginBottom: 25
    }
})
