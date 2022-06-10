import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Animated
} from 'react-native';
import { CommonBackground, ButtonColor, getLoggedIn } from '../utilities'
import FormButton from '../components/FormButton';
import ImageSlider from 'react-native-image-slider';
import HomeSlider from '../components/HomeSlider';

const { width, height } = Dimensions.get('window');
export default class Welcome extends Component {

    async componentDidMount() {
        const auth = await getLoggedIn();
        if (auth == 'true') {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'DashBoard', screen: 'DashBoard' }]
            });
        }
    }


    render() {
        const scrollX = new Animated.Value(0);
        let position = Animated.divide(scrollX, width);

        const imgs = [
            'https://placeimg.com/640/640/nature',
            'https://placeimg.com/640/640/people',
            'https://placeimg.com/640/640/animals',
            'https://placeimg.com/640/640/beer',
        ];

        return (
            <View style={{ flex: 1, backgroundColor: CommonBackground }}>
                <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 30 }}>
                        <FormButton
                            title='Log in'
                            btnFontFamily='Roboto-Regular'
                            txtColor='#000'
                            onClick={() => this.props.navigation.navigate('Login')}
                        //style={{ backgroundColor: 'skyblue' }}
                        />
                    </View>
                </View>
                <View style={{ flex: 0.65, paddingHorizontal: 25, justifyContent: 'space-around' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/1-02.png')}
                            style={{ height: 55, resizeMode: 'contain' }}
                        />
                    </View>

                    <View style={{
                        height: 280,
                        width: 280,
                        alignSelf: 'center',
                        // padding: 5,
                        // paddingHorizontal: 25,
                        //  paddingVertical: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 3,
                        borderColor: 'rgb(146 146 147)'
                    }}>
                        <FlatList
                            horizontal
                            data={imgs}
                            pagingEnabled
                            scrollEnabled
                            snapToAlignment="center"
                            scrollEventThrottle={16}
                            decelerationRate={"fast"}
                            showsHorizontalScrollIndicator={false}
                            renderItem={() => {
                                return (
                                    <Image
                                        source={require('../assets/1-03.png')}
                                        style={{ height: 280, width: 280, resizeMode: 'cover' }}
                                    />
                                )
                            }}
                            onScroll={Animated.event([
                                { nativeEvent: { contentOffset: { x: scrollX } } },
                            ])}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                    {/* <View style={{
                        height: 280,
                        width: 280,
                        alignSelf: 'center',
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 3,
                        borderColor: 'rgb(146 146 147)'
                    }}>
                        <Image
                            source={require('../assets/1-03.png')}
                            style={{ height: 275, width: 275 }}
                        />
                    </View> */}
                </View>


                <View style={{ flex: 0.25, paddingHorizontal: 40, justifyContent: 'space-around', marginBottom: 15 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Roboto-Regular', fontSize: 12.5 }}>
                            Shop For Exeptional Modern Clothings For Your Everyday Life
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
                        <FormButton
                            title='Go Shopping'
                            btnFontFamily='Roboto-Regular'
                            style={{
                                backgroundColor: ButtonColor,
                                padding: 15,
                                borderRadius: 0,
                                alignItems: 'center'
                            }}
                            onClick={() => this.props.navigation.navigate('Register')}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        {imgs.map((_, i) => {
                            let opacity = position.interpolate({
                                inputRange: [i - 1, i, i + 1],
                                outputRange: [0.3, 1, 0.3],
                                extrapolate: "clamp",
                            }); 

                            return (
                                <View style={{ borderRadius: 15, margin: 3 }}>
                                    <Animated.View
                                        key={i}
                                        style={{
                                            opacity,
                                            height: 10,
                                            width: 10,
                                            backgroundColor: ButtonColor,
                                            borderRadius: 5,
                                        }}
                                    />
                                </View>
                            );
                        })}
                    </View>

                </View>

            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})