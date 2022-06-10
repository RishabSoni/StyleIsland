import React from 'react';
import {
    Modal,
    View,
    Image,
    Text,
    Dimensions
} from 'react-native';
import { ButtonColor, CommonBackground } from '../utilities';
import FormButton from './FormButton';

const { width, height } = Dimensions.get('window');
export default ({ isShow , onClose }) => {
    return (
        <Modal animationType='slide'
            transparent={true}
            visible={isShow}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000ad', }}>
                <View style={{ flex: 0.6, padding: 10, width: width - 100, backgroundColor: '#fff', justifyContent: 'space-around', marginVertical: 15 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 25 }}>
                        <Image source={require('../assets/1-01.png')}
                            style={{ height: 150, width: 146, resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, textAlign: 'center' }}>
                            You'll shortly receive an email with a code to setup a new password.
                        </Text>
                    </View>

                    <View style={{ justifyContent: 'center', paddingBottom: 25 }}>
                        <FormButton
                            title='Enter Code'
                            btnFontFamily='Roboto-Regular'
                            style={{
                                padding: 10,
                                marginHorizontal: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 0,
                                backgroundColor: ButtonColor
                            }}
                            onClick={onClose}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}