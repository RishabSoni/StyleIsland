import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('window');
import ImageSlider from 'react-native-image-slider';
import { ButtonColor } from '../utilities';
import HTML from "react-native-render-html";

export default ({ data, contentArr, used }) => {

    //   console.log(contentArr, "<==", data)

    return (
        <ImageSlider
            //  loopBothSides
            //autoPlayWithInterval={3000}
            images={data}
            customSlide={({ index, item, style, width }) => (
                // It's important to put style here because it's got offset inside
                <View key={index} style={[{ width: width }]}>
                    <Image source={{ uri: item }} style={{
                        //width: width, 
                        height: height / 3,
                        width: width,
                        resizeMode: 'stretch',
                        transform: [
                            { scaleX: -1 }
                        ]
                    }} />
                </View>
            )}
            allowedStyles={{ alignItems: 'center' }}
            customButtons={(position, move) => {
                const txtAr = contentArr.length > 0 && contentArr[position]['textContent'].replace(/\s+/g, ' ').trim();
                const headerTitle = contentArr.length > 0 && contentArr[position]['headerTitle'];
                //const spaceCount = (txtAr && txtAr.split(" ").length - 1);
                console.log(position, "<==position")
                return (
                    //  console.log(txtAr),
                    <View style={{ alignItems: 'center' }}>
                        
                        <View style={{ justifyContent: 'space-around', flexDirection: 'row', height: 70, marginHorizontal: 15 }}>
                            <View style={{ flex: 0.25, justifyContent: 'center' }}>
                                <View style={{ height: 1, backgroundColor: '#000', width: '100%' }} />
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'Roboto-Bold', textAlign: 'center' }}>
                                        {headerTitle}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.25, justifyContent: 'center' }}>
                                <View style={{ height: 1, backgroundColor: '#000', width: '100%' }} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {txtAr && txtAr.split('<br>').map((item, index) => {
                                return (
                                    <Text style={{ fontFamily: 'Roboto-Regular', color: 'gray' }}>
                                        {item.replace(/^\s+|\s+$/gm, '')}
                                    </Text>
                                )
                            })}
                        </View>

                        <View style={[{ flexDirection: 'row' }, styles.buttons]}>
                            {data.map((image, index) => {
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
                                            borderColor: ButtonColor,
                                            borderWidth: 0.8,
                                            borderRadius: 10,
                                        }]}>
                                            <View style={{
                                                width: 5,
                                                height: 5,
                                                borderRadius: 5,
                                                padding: 1,
                                                backgroundColor: 'gray',
                                                //borderWidth: 1,

                                            }} />
                                        </View>
                                    </TouchableHighlight>
                                );
                            })}
                        </View>
                    </View>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({

})
