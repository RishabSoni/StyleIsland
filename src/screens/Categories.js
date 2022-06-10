import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import { ApiCall } from '../api-services';
import { BaseUrl } from '../utilities';
import { Card } from 'react-native-paper';


export default class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            isLoading: false,
            //data: { Categories: [{ title: 'Gold' }, { title: 'silver' }], Collections: [] }
        }

    }

    componentDidMount() {
        this.fetchingCategories();
    }

    fetchingCategories = async () => {
        try {
            this.setState({ isLoading: false })
            const response = await ApiCall(
                `${BaseUrl}/api/categories`,
                'GET'
            );
            const result = await response.json();
            this.setState({ categories: result })
            console.log(result, "<==result")
        } catch (e) {
            console.log(e)
        }
        finally {
            this.setState({ isLoading: false })
        }
    }

    renderCategory = ({ item, i }) => {
        const { navigation } = this.props;
        const { categories, data } = this.state;
        return (
            <Card style={{ marginHorizontal: 10, marginTop: 5, marginBottom: 10 }}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.push('ShopDetails', { [item]: categories[item] })}>
                    <View style={styles.categoryCardConatiner}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontFamily: 'Roboto-Regular' }}>{item}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../assets/338321_orange_1_6ddea333.jpg')} style={{ height: 85, width: 50, borderRadius: 10 }} />
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        )
    }

    render() {
        const { isLoading, categories } = this.state;
        const category = Object.keys(categories);

        if (isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator animating size='large' color='#f26c20c7' />
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {/* <Header title='Shop' /> */}
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={category}
                        keyExtractor={(item, i) => `key_${i}`}
                        renderItem={this.renderCategory}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryCardConatiner: {
        paddingHorizontal: 20,
        //  backgroundColor: '#fff',
        //marginTop: 10,
        //marginBottom: 5,
        // elevation: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

        paddingVertical: 15,
        borderRadius: 5
    }
})