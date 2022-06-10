import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { TxtColor } from '../utility/utilities';
export default ({ style, title, onClick, txtColor, btnFontFamily }) => {
    return (
        <TouchableOpacity onPress={onClick} activeOpacity={0.5} >
            <View style={[styles.container, style]}>
                <Text style={{ color: txtColor ? txtColor : '#f3f3f3', fontFamily: btnFontFamily ? btnFontFamily : 'Roboto-Thin' }}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        //marginHorizontal: 15,
        borderRadius: 5,
        //width : width-50
    }
})