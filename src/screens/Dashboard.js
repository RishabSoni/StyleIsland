import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { ApiCall } from '../api-services';
import FormButton from '../components/FormButton';
import HomeSlider from '../components/HomeSlider';
import ShopByWear from '../components/ShopByWear';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { height } = Dimensions.get('window');
import { BaseUrl, CommonBackground } from '../utilities';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class DashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            bestSellers: []
        }
    }

    componentDidMount() {
        this.fetchingHomeData()
        this.fetchingBestSellers()
    }

    fetchingHomeData = async () => {
        try {
            this.setState({ isLoading: true })
            const res = await ApiCall(
                `${BaseUrl}/api/home`,
                'GET'
            );
            const response = await res.json();
            this.setState({ data: response });
            console.log(response, "<===fetchingHomeData res")
        } catch (e) {
            console.log(e, "<===fetchingHomeData")
        }
        finally {
            this.setState({ isLoading: false })
        }
    }

    fetchingBestSellers = async () => {
        try {
            this.setState({ isLoading: true })
            const result = await ApiCall(
                `${BaseUrl}/api/hotpicks`,
                `GET`
            );
            const { hotpicks } = await result.json();
            console.log(hotpicks, "<==hotpicks")
            this.setState({ bestSellers: hotpicks })
        } catch (e) {
            console.log('error=>>>>>>>', e)
        } finally {
            setLoading(false)
        }
    }

    renderBestSellers = ({ item, index }) => {
      //  console.log(item, "<==item")

        const imgurlHandle = (data) => {
            return data.split(',')[0];
        }

        const collection = JSON.parse(item.collectiont);

        return (
            <View style={{
                //height: 180,
                width: 160,
                // alignItems: 'center',
                // backgroundColor: '#fff',
                // marginLeft: 15,
                //marginBottom: 15,
                marginRight: 10
                //, padding: 5
            }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{ uri: `${BaseUrl + imgurlHandle(item.image)}` }}
                        style={{ height: 160, width: 160, resizeMode: 'cover' }}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 0.8 }}>
                        <View style={{ justifyContent: 'center', paddingTop: 5 }}>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 13, color: 'gray' }}>
                                {collection.map((item, index) => {
                                    return (
                                        <Text style={{ fontFamily: 'Roboto-Regular' }}>
                                            {item}
                                            {collection.length !== index + 1 ? <Text>  |  </Text> : null}
                                        </Text>
                                    )
                                })}
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'center', paddingVertical: 2 }}>
                            <Text style={{ fontFamily: 'Roboto-Regular' }}>
                                {item.name}
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'center', flex: 0.5 }}>
                            <Text style={{ fontFamily: 'Roboto-Bold', }}>
                                {`₹ ${item.price}`}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5 }}>
                            <Ionicons name='ios-heart-outline' size={18} />
                        </View>
                    </View>
                </View>

                {/* <View style={{ justifyContent: 'center', paddingTop: 5 }}>
                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 13, color: 'gray' }}>
                        {collection.map((item, index) => {
                            return (
                                <Text style={{ fontFamily: 'Roboto-Regular' }}>
                                    {item}
                                    {collection.length !== index + 1 ? <Text>  |  </Text> : null}
                                </Text>
                            )
                        })}
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', paddingVertical: 2 }}>
                    <Text style={{ fontFamily: 'Roboto-Regular' }}>
                        {item.name}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <View style={{ justifyContent: 'center', flex: 0.5 }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', }}>
                            {`₹ ${item.price}`}
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center', flex: 0.5, alignItems: 'flex-end' }}>
                        <Ionicons name='ios-heart-outline' size={18} />
                    </View>
                </View> */}
            </View>
        )
    }

    render() {
        const { isLoading, data } = this.state;


        //  console.log(data, "<==home")

        return (
            <View style={styles.container}>
                <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={{ flex: 0.5, justifyContent: 'center' }}>
                        <Image
                            source={require('../assets/1-02.png')}
                            style={{
                                resizeMode: 'contain',
                                height: 35,
                                width: 150
                            }}
                        />
                    </View>
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <FormButton
                            txtColor='#000'
                            title='Search'
                            btnFontFamily='Roboto-Regular'
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 80
                            }}
                        />
                    </View>
                </View>
                <View style={{ flex: 0.9 }}>
                    <ScrollView>
                        <View style={{ paddingHorizontal: 15 }}>
                            <FlatList
                                data={[{}, {}, {}, {}, {}, {}]}
                                horizontal={true}
                                style={{ marginBottom: 5 }}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity>
                                            <View style={{
                                                //padding: 2,
                                                marginRight: 15,
                                                alignItems: 'center',
                                                //justifyContent: 'center',
                                                // backgroundColor : 'pink',
                                                height: 80
                                            }}>
                                                <Image
                                                    source={require('../assets/1-03.png')}
                                                    style={{
                                                        height: 50,
                                                        width: 50,
                                                        borderRadius: 50
                                                    }}
                                                />
                                                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 12 }}>New One</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>


                        <View style={{ paddingHorizontal: 15 }}>
                            <ManageBannerData data={data} />
                        </View>
                        <ShopByWear
                            redirect={this.props.navigation}
                            listData={data && data.shopbywear} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'pink', marginHorizontal: 15, marginVertical: 15 }}>
                            <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 22, textAlign: 'center' }}>
                                    Free Shipping on order INR 1999+
                                </Text>
                            </View>
                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                <Icon name='check-square-o' size={25} color='#000' />
                            </View>
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingBottom: 15 }}>
                            <View style={{ justifyContent: 'center', flex: 0.75 }}>
                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18 }}>
                                    Best Sellers
                                </Text>
                            </View>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('')}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 0.25 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Roboto-Bold' }}>
                                            View All
                                    </Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name='arrow-right' size={15} color='#000' />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ paddingHorizontal: 15 }}>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                //   style={{ paddingHorizontal: 15 }}
                                data={this.state.bestSellers}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this.renderBestSellers}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const ManageBannerData = ({ data }) => {
    let imageArr = [];
    let contentArr = [];
    data && data.sliders.map((item, i) => {
        let dt = { headerTitle: item.title, categoryId: parseInt(item.cat_id), textContent: item.html }
        //console.log(dt, "<==dt")
        contentArr.push(dt);
        imageArr.push(item.image);
        //  console.log(item)
    })

    return (
        <HomeSlider
            data={imageArr}
            contentArr={contentArr}
            used='Home'
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: CommonBackground,
        // height: height
    }
})