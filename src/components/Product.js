import React, { useState } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BaseUrl } from '../utilities';
import Loader from './Loader';

const { width, height } = Dimensions.get('window');

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            screenMode: 'PORTRAIT',
            productList: []
        }
    }

    // componentDidMount() {
    //     this._navListener = this.props.navigation.addListener('focus', () => {
    //         // get your new data here and then set state it will rerender
    //         console.log('hiii , called')
    //         this.fetchingList()
    //     });
    // }

    // componentWillUnmount() {
    //     this._navListener();
    // }

    // fetchingList = async () => {
    //     try {
    //         this.setState({ isLoading: true })
    //     } catch (e) {
    //         console.log(e)
    //     } finally {
    //         this.setState({ isLoading: false })
    //     }
    // }

    _onLayout = (event) => {
        const { width, height } = event.layout; //somewhat similar object
        const orientation = (width > height) ? 'LANDSCAPE' : 'PORTRAIT';
        setScreenMode(orientation);
    }

    render() {
        const { navigation } = this.props;
        const { isLoading, screenMode, productList } = this.state;
        const imgurlHandle = (data) => {
            return data.split(',')[0];
        }

        if (this.props.isLoading) {
            return (
                <Loader visible={this.props.isLoading} />
            )
        }

        console.log(this.props.list, "<==this.props.list")

        return (
            <FlatList
                data={this.props.list}
                numColumns={screenMode == 'PORTRAIT' ? 2 : 3}
                showsVerticalScrollIndicator={false}
                style={{ alignSelf : 'center' }}
                renderItem={({ item, index }) => {
                    const cat = JSON.parse(item.collectiont);
                    return (
                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('ProductDetails', item)}>
                            <View style={{ margin: 5 }} >
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: `${BaseUrl + imgurlHandle(item.image)}` }}
                                        style={{ resizeMode: 'cover', width: width / 2 - 30, height: 170, }}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 0.8 }}>
                                        <View style={{ justifyContent: 'center', paddingTop: 5 }}>
                                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 13, color: 'gray' }}>
                                                {cat.map((item, index) => {
                                                    return (
                                                        <Text style={{ fontFamily: 'Roboto-Regular' }}>
                                                            {item}
                                                            {cat.length !== index + 1 ? <Text>  |  </Text> : null}
                                                        </Text>
                                                    )
                                                })}
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', paddingVertical: 2 }}>
                                            <Text style={{ fontFamily: 'Roboto-Regular' }}>
                                                {item.keyword}
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', flex: 0.5 }}>
                                            <Text style={{ fontFamily: 'Roboto-Bold', }}>
                                                {`₹ ${item.price}`}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}>
                                            <Ionicons name='ios-heart-outline' size={18} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }
}