import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ButtonColor, CommonBackground } from '../utilities';
import FormButton from '../components/FormButton';
import ForgotModal from '../components/ForgotModal';

export default class ForgotPassword extends Component {
    state = {
        visible: false
    }
    render() {
        const { visible } = this.state;
        return (

            <View style={styles.mainContainer}>
                {/* <ScrollView> */}
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.15, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name='arrow-back-outline' size={22} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 0.25 }}>
                        <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
                            <Text style={{
                                fontFamily: 'Roboto-Bold',
                                color: '#000',
                                fontSize: 22
                            }}>
                                Forgot Password ?
                        </Text>
                        </View>
                        <View style={{ padding: 15 }}>
                            <View style={{ justifyContent: 'center', marginVertical: 15, paddingRight: 40 }}>
                                <Text style={{ fontFamily: 'Roboto-Regular', color: 'gray', fontSize: 15 }}>
                                    Enter you email to receive the instruction to reset your Password.
                                </Text>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <TextInput style={{
                                        fontFamily: 'Roboto-Regular',
                                        color: '#000',
                                        borderBottomWidth: 0.5
                                    }}
                                        keyboardType='email-address'
                                        placeholder='Your Email'
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.6, justifyContent: 'flex-end', paddingBottom: 35 }}>
                        <FormButton
                            btnFontFamily='Roboto-Regular'
                            title='Send me now'
                            //  txtColor='#000' 
                            style={{
                                marginHorizontal: 15,
                                borderRadius: 0,
                                padding: 10,
                                backgroundColor: ButtonColor,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onClick={() => this.setState({ visible: true })}
                        />
                    </View>

                </View>
                {/* </ScrollView> */}

                {visible && (
                    <ForgotModal isShow={visible} onClose={() => this.setState({ visible: false })} />
                )}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: CommonBackground
    }
})