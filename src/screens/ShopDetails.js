import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
const { height, width } = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ButtonColor } from '../utilities';
export default class ShopDetails extends Component {

    movingScreen = (data) => {
        const { navigation, route } = this.props;
        const headerTitle = Object.keys(this.props.route.params)[0]
        if (data.subMenu) {
        } else {
            navigation.push('ProductList', { categoryId: data.category_id, headerTitle: data.title });
        }
    }
    
    renderRow = ({ item, i }) => {
        return (
            <TouchableOpacity onPress={() => this.movingScreen(item)} activeOpacity={0.5}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 50, paddingHorizontal: 10 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Gill Sans Medium' }}> {item.title} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

   

    render() {
        const { navigation, route } = this.props;
        const headerTitle = Object.keys(route.params)[0]
        const data = this.props.route.params[headerTitle];

        return (
            <View style={styles.container}>
                <View style={{ flex: 0.08, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name='arrow-back' size={20} />
                    </View>
                    <View style={{ flex: 0.9, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Roboto-Bold' }}>
                            Category
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 0.92 }}>

                    <View style={{ justifyContent: 'center', backgroundColor: 'gray', paddingVertical: 40, marginHorizontal: 12, paddingLeft: 15 }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', color: '#fff', fontSize: 22 }}>
                            Get 20% off
                            </Text>
                        <Text style={{ fontFamily: 'Roboto-Regular', color: '#fff', fontSize: 16 }}>
                            Free return fast refund
                            </Text>
                    </View>

                    <View style={{ marginVertical: 15, height: 1, backgroundColor: '#000', width: '92%', marginHorizontal: 15 }} />

                    <View style={{ paddingHorizontal: 15 }}>
                        <FlatList
                            data={data}
                            renderItem={this.renderRow}
                            ItemSeparatorComponent={() => (
                                <View
                                    style={{
                                        //margin : 1,
                                        backgroundColor: 'lightgray',
                                        height: 0.5,
                                        width: '100%'
                                    }}
                                />
                            )}
                            keyExtractor={(item, i) => i.toString()}
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
        // alignItems: 'center'
    }
})