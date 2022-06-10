import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    FlatList,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';
import ListAccordian from '../components/ListAccordian';
import { ApiCall } from '../api-services';
import { BaseUrl, ButtonColor, CommonBackground } from '../utilities';
const { height, width } = Dimensions.get('window');
import ImageSlider from 'react-native-image-slider';
import Loader from '../components/Loader';
import ModalDropdown from '../components/ModalDropdown';

export default class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: null,
            qty: 1,
            productData: null,
            freeProducts: [],
            isShow: false,
            freeSelected: [],
            coodsset: null,
            bestSellers: [],
            isLoading: false,
            sizeOpen: false
        }
    }

    componentDidMount() {
        this.fetchingDetails();
        this.fetchingBestSellers()
    }

    fetchingDetails = async () => {
        const { navigation, route } = this.props;
        const { image, name, price, product_id, keyword, id, category_id } = route.params;

        try {
            const res = await ApiCall(
                `${BaseUrl}/api/product/${product_id ? product_id : id}/${category_id}`,
                'Get'
            );
            const result = await res.json();
            this.setState({
                productData: result.product,
                freeProducts: result.freeproduct,
                coodsset: result.coodsset
            })
        } catch (e) {
            console.log(e)
        }
    }

    selectSize = (size) => {
        this.setState({
            size: size
        })
    }

    manageImageUrls = () => {
        const { params } = this.props.route;
        console.log(params.image, "<==params")
        const imgs = params.image.split(',');
        let a = [];
        imgs.map((item) => {
            a.push(BaseUrl + item)
        });
        console.log(a)
        return a;
    }

    manageArr = (data) => {
        const { size, productData } = this.state;
        console.log(productData, "<===ppppppppppp")

        if (productData == null) {
            return (
                <Loader visible={true} />
            )
        }

        let titles = ['MATERIALS', 'TYPE OF IT', 'PRODUCT CARE'];
        return titles.map((item, i) => {
            if (i == 0) {
                return (
                    <>
                        <ListAccordian title={item} toggle={true} content={productData.descriptions[0].description} />
                        <View style={styles.hrLine} />
                    </>
                )
            } else if (i == 1) {
                return (
                    <>
                        <ListAccordian title={item} toggle={true} content={productData && productData.pfit} />
                        <View style={styles.hrLine} />
                    </>
                )
            } else {
                return (
                    <>
                        <ListAccordian title={item} toggle={true} content={productData && productData.washinc} />
                        <View style={styles.hrLine} />
                    </>
                )
            }
        })
    }

    fetchingBestSellers = async () => {
        try {
            this.setState({ isLoading: true })
            const result = await ApiCall(
                `${BaseUrl}/api/hotpicks`,
                `GET`
            );
            const { hotpicks } = await result.json();
            this.setState({ bestSellers: hotpicks })
        } catch (e) {
            console.log('error=>>>>>>>', e)
        } finally {
            this.setState({ isLoading: false })
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
                width: 150,
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
                        style={{ height: 150, width: 150, resizeMode: 'cover' }}
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

    renderSize = () => {
        const { size, productData } = this.state;
        let i = 0;
        let sizesArr = [];
        while (i < productData.attributes.length) {
            if (i != 0) {
                sizesArr.push(productData.attributes[i].name)
            }
            i++;
        }
        return sizesArr;
    }

    render() {
        const { size, productData, qty, isShow, freeProducts, freeSelected, coodsset, sizeOpen } = this.state;
        const { color } = this.props.route.params
        if (productData == null) {
            return (
                <Loader visible={true} />
            )
        }
        const { params } = this.props.route;
        const img = this.manageImageUrls()
        const colorArr = color.split('/');

        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{
                            height: height / 2,
                            backgroundColor: 'pink',
                            width: '100%'
                        }}>
                            <View style={{ width: '92%', alignSelf: 'center', height: 70, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', zIndex: 9 }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Ionicons name='arrow-back' size={25} color='#fff' />
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Ionicons
                                        name='basket-outline'
                                        size={25}
                                        color='#fff'
                                    />
                                </View>
                            </View>
                            <ImageSlider
                                images={img}
                                customButtons={(position, move) => {
                                    return (
                                        <View style={[{ flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 35 }, styles.buttons]}>
                                            {img.map((image, index) => {
                                                return (
                                                    <TouchableHighlight
                                                        key={index}
                                                        // underlayColor="#ccc"
                                                        onPress={() => move(index)}
                                                        style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, marginVertical: 15 }}
                                                    >
                                                        <View style={[{
                                                            width: 10,
                                                            height: 10,
                                                            borderRadius: 10,
                                                            padding: 5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'

                                                        }, position === index && {
                                                            borderColor: '#fff',
                                                            borderWidth: 0.8,
                                                            borderRadius: 10,
                                                        }]}>
                                                            <View style={{
                                                                width: 5,
                                                                height: 5,
                                                                borderRadius: 5,
                                                                padding: 1,
                                                                backgroundColor: '#fff',
                                                                //borderWidth: 1,

                                                            }} />
                                                        </View>
                                                    </TouchableHighlight>
                                                );
                                            })}
                                        </View>
                                    )
                                }}
                            />
                        </View>
                        <View style={{
                            //  height: height / 1.5,
                            backgroundColor: '#fff',
                            //  elevation: 2,
                            width: '100%',
                            borderTopLeftRadius: 35,
                            borderTopRightRadius: 35,
                            bottom: 25
                            //position: 'absolute', 
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 25, paddingBottom: 15, paddingHorizontal: 25 }}>
                                <View style={{
                                    flex: 0.8,
                                    justifyContent: 'center',
                                    //alignItems: 'center'
                                }}>
                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18 }}>
                                        {params.keyword}
                                    </Text>

                                    <Text style={{ fontFamily: 'Roboto-Regular', color: 'gray' }}>
                                        Style No :  {params.sku}
                                    </Text>
                                </View>
                                <View style={{
                                    flex: 0.2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <Image
                                        source={require('../assets/heart.png')}
                                        style={{ height: 25, width: 25, resizeMode: 'contain' }}
                                    />
                                    <Image source={require('../assets/share.png')}
                                        style={{ height: 25, width: 25, resizeMode: 'contain' }}
                                    />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
                                <View style={{ flex: 0.6, justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 18 }}>
                                        INR {params.price}
                                    </Text>
                                </View>
                                <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => this.setState({ sizeOpen: true })}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 13 }}>
                                                {size ? size : 'Size'}
                                            </Text>
                                            <Ionicons name='caret-down' size={18} />
                                        </View>
                                    </TouchableOpacity>

                                    <ModalDropdown
                                        visible={sizeOpen}
                                        onclick={(txt) => this.setState({size : txt , sizeOpen : false})}
                                        data={this.renderSize()}
                                    />
                                </View>
                            </View>

                            <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginHorizontal: 25, marginVertical: 15 }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, marginVertical: 15 }}>
                                <View style={{ flex: 0.4, justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 13 }}>
                                        Color : &nbsp;
                                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 13 }}>
                                            {colorArr[0]}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={{ flex: 0.6, justifyContent: 'flex-end', flexDirection: 'row' }}>
                                    {[1].map((item) => {
                                        return (
                                            <View style={{ padding: 5, borderColor: `rgb(${colorArr[1]})`, borderWidth: 1, borderRadius: 50, marginRight: 5, marginVertical: 5 }}>
                                                <View
                                                    style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: `rgb(${colorArr[1]})` }}
                                                />
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>

                            <View style={{ justifyContent: 'center', marginHorizontal: 25 }}>
                                <ListAccordian title={'DESCRIPTION'} content={productData.descriptions[0].content} />
                                <View style={styles.hrLine} />
                                {this.manageArr()}
                            </View>

                            <View style={{ paddingHorizontal: 25 }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }}>
                                    <View style={{ flex: 0.5, justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'Roboto-Bold' }}>
                                            You might also like
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Text style={{ fontFamily: 'Roboto-Regular', color: 'gray' }}>
                                            12 Items
                                        </Text>
                                    </View>
                                </View>

                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    //   style={{ paddingHorizontal: 15 }}
                                    data={this.state.bestSellers}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={this.renderBestSellers}
                                />
                            </View>

                        </View>
                    </ScrollView>
                </View>
                <FormButton
                    title='Add to cart'
                    btnFontFamily='Roboto-Bold'
                    style={{
                        //flex : 1,
                        //paddingVertical: 15,
                        padding: 15,
                        justifyContent: 'center',
                        backgroundColor: ButtonColor,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        borderRadius: 0,
                        marginVertical: 0,
                        alignItems: 'center'
                    }} />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CommonBackground
        //   justifyContent: 'center',
        //  alignItems: 'center'
    },
    hrLine: {
        backgroundColor: '#ccc',
        width: '100%',
        height: 1,
        marginVertical: 10
    }
})