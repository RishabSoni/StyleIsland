import React from 'react';
import {
    Text,
    View,
    Modal,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApiCall } from '../api-services';
import { BaseUrl, ButtonColor, CommonBackground } from '../utilities';
import FormButton from './FormButton';

const sortType = [
    { label: 'Newest', value: 'sort_asc' },
    { label: 'Best Sellers', value: 'best_seller' },
    { label: 'Price High To Low', value: 'price_desc' },
    { label: 'Price Low To High', value: 'price_asc' }
]

export default class FilterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            active: 'Filter',
            priceList: [],
            sizeList: [],
            colorsList: []
        }
    }

    componentDidMount() {
        this.fetchSortedData();
    }

    priceManage = (price) => {
        const keys = Object.keys(price);
        const val = Object.values(price);
        let i = 0;
        let arr = [];
        while (i < keys.length) {
            let obj = {};
            obj.label = keys[i];
            obj.value = val[i];
            arr.push(obj)
            i++;
        }
        return arr;
    }


    fetchSortedData = async () => {
        try {
            const res = await ApiCall(`${BaseUrl}/api/filterelement/${this.props.categoryId}`, 'get');
            const response = await res.json();
            this.setState({
                priceList: this.priceManage(response.price),
                sizeList: this.priceManage(response.size),
                colorsList: this.priceManage(response.color)
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { visible, active } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Modal animationType="slide"
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        this.setState({ visible: !visible })
                    }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#000000ad', }}>
                        {active == 'Filter' ?
                            <View style={{ flex: 1, backgroundColor: CommonBackground }}>
                                <View style={{ flex: 0.1, flexDirection: 'row' }}>
                                    <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => this.setState({ visible: !visible })}>
                                            <Ionicons name='close' size={20} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 0.75, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>
                                            Filter
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>
                                            Reset
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.7 }}>

                                    <View style={styles.row}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.label}>
                                                Product Type
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.value}>
                                                All
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.row}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.label}>
                                                Collection
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.value}>
                                                All
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.row}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.label}>
                                                Colour
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.value}>
                                                All
                                            </Text>
                                        </View>
                                    </View>


                                    <View style={styles.row}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.label}>
                                                Price
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.value}>
                                                All
                                            </Text>
                                        </View>
                                    </View>

                                    {/* <View style={styles.line} /> */}

                                    <View style={styles.row}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.label}>
                                                Size
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.value}>
                                                All
                                            </Text>
                                        </View>
                                    </View>
                                    {/* <View style={styles.line} /> */}
                                </View>
                                <View style={{ flex: 0.2, justifyContent: 'center' }}>
                                    <FormButton
                                        title='Apply'
                                        btnFontFamily='Roboto-Regular'
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 10,
                                            backgroundColor: ButtonColor,
                                            marginHorizontal: 15,
                                            borderRadius: 0
                                        }}
                                    />
                                </View>
                            </View> :
                            <View style={{ flex: 0.5, backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                                <View style={{ flex: 0.1, flexDirection: 'row', paddingVertical: 15 }}>
                                    <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => this.setState({ visible: !visible })}>
                                            <Ionicons name='close' size={20} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 0.85, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>
                                            Sort By
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.9 }}>
                                    <FlatList
                                        data={sortType}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={{ marginVertical: 5, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View>
                                                        <FormButton
                                                            btnFontFamily='Roboto-Bold'
                                                            title={item.label}
                                                            txtColor='#000'
                                                            onClick={() => this.selectSortBy(item)}
                                                        />
                                                    </View>

                                                    <View>
                                                        <Ionicons name='ios-checkmark' size={20} />
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        }
                    </View>
                </Modal>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ width: '45%', justifyContent: 'center' }} onPress={() => this.setState({ visible: !visible, active: 'Sort' })}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Roboto-Regular' }}>
                                    Sort
                                </Text>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <Ionicons name='arrow-down' />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin' }}>
                            |
                        </Text>
                    </View>
                    <TouchableOpacity style={{ width: '45%', justifyContent: 'center' }} onPress={() => this.setState({ visible: !visible, active: 'Filter' })}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Roboto-Regular' }}>
                                    Filter
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginVertical: 5,
        paddingVertical: 15,
        borderBottomWidth: 0.5
    },
    line: {
        height: 0.8,
        backgroundColor: '#000',
        width: '95%',
        alignSelf: 'center'
    },
    label: {
        fontFamily: 'Roboto-Bold'
    },
    value: {
        fontFamily: 'Roboto-Regular'
    }
})