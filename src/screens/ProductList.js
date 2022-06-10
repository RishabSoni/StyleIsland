import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilterModal from '../components/FilterModal'
import Product from '../components/Product';
import Loader from '../components/Loader';
import { ApiCall } from '../api-services';
import { BaseUrl } from '../utilities';
export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            screenMode: 'PORTRAIT',
            productList: []
        }
    }

    componentDidMount() {

        this._navListener = this.props.navigation.addListener('focus', () => {
            // get your new data here and then set state it will rerender
            console.log('hiii , called')
            this.fetchingList()
        });
    }

    componentWillUnmount() {
        this._navListener();
    }

    fetchingList = async () => {
        try {
            const { navigation, route } = this.props;
            this.setState({ isLoading: true });
            const response = await ApiCall(
                `${BaseUrl}/api/products/${route.params.categoryId}`,
                'GET'
            );

            const result = await response.json();
            this.setState({ productList: result })
            console.log(result, "<==fetchingList")
        } catch (e) {
            console.log(e)
        } finally {
            this.setState({ isLoading: false })
        }
    }

    render() {
        const { navigation, route } = this.props;
        const { isLoading, screenMode, productList } = this.state;
        console.log(route.params, "<==")


        return (
            <View style={styles.container}>
                <View style={{ flex: 0.1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name='arrow-back' size={20} />
                    </View>
                    <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>
                            {route.params.headerTitle}
                        </Text>
                    </View>
                    <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name='cart' size={20} />
                    </View>
                </View>
                <View style={{ flex: 0.9 }}>
                    <View style={{ flex: 0.1, borderTopWidth: 0.5, borderBottomWidth: 0.5 }}>
                        <FilterModal />
                    </View>
                    <View style={{ flex: 0.06, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>
                            {productList.length} Products
                        </Text>
                    </View>
                    <View style={{ flex: 0.84 }}>
                        <Product
                            list={productList}
                            navigation={this.props.navigation}
                            isLoading={isLoading}
                        />
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center'
    }
})