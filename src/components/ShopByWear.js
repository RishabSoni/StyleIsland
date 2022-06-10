import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Dimensions,
    ImageBackground
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default ({ listData, redirect }) => {
    const renderRow = ({ item, index }) => {
        // console.log(item, "<====shop by url")
        return (
            <View style={{
                flex: 1,
                //backgroundColor : 'red',
                marginVertical : 5,
                marginHorizontal : 5
            }}>
                <Image source={{ uri: item.image }} style={{ resizeMode: 'center', height: 250, width: width / 2 - 18, alignSelf: 'center' }} />
                <TouchableOpacity onPress={() => redirect.navigate('ProductList', { categoryId: item.cat_id, headerTitle: item.title })}>
                    <View style={styles.cardTextContainer}>
                        {htmlManage(item.html).map((item, i) => {
                            if (i == 0) {
                                return (<Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: '#000' }}>
                                    {item}
                                </Text>)
                            } else {
                                return (
                                    <Text style={styles.cardText}>
                                        {item}
                                    </Text>
                                )
                            }
                        })}

                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const htmlManage = (content) => {
        return content.split('<br>\r\n');
    }

    return (
        <FlatList
            data={listData}
            keyExtractor={(_, i) => `key_${i}`}
            renderItem={renderRow}
            initialNumToRender={5}
            numColumns={2}
        />
    )
}

const styles = StyleSheet.create({
    GridViewContainer: {
        justifyContent: 'center',
        overflow: "hidden",
        flex: 1,
        justifyContent: 'center',
        margin: 5,
        // backgroundColor: '#231F20',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 6,
        //padding: 5,
    },
    trendCard: {
        width: '95%',
        //  aspectRatio: 135 / 76,
        flex: 1,
        resizeMode: "contain",
        height: 250,
        marginHorizontal: 2,
        // alignItems: 'center',
        // justifyContent: 'flex-end',

    },
    cardTextContainer: {
        // justifyContent: 'center',
        //  backgroundColor: '#bc897e9c',
        //  padding: 15,
        //  marginHorizontal: 15
        // borderTopLeftRadius: 5,
        // borderTopRightRadius: 5
        width: width / 2 - 18,
        alignSelf: 'center'
    },
    cardText: {
        color: 'gray',
        //        fontWeight: '900',
        fontFamily: 'Roboto-Regular',
        fontSize: 13
    }
})