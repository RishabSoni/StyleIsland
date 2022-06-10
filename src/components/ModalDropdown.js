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

export default ({ visible, data, onclick }) => {

    const seperator = () => (
        <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
    )
    
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Modal animationType="slide"
                transparent={true}
                visible={visible}
            >
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000000ad', }}>
                    <View style={{ flex: 0.5, backgroundColor: '#fff', marginHorizontal: 15, borderRadius: 25 }}>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', padding : 25, borderBottomWidth : 0.5 , borderBottomColor : '#ccc'}}>
                            <View>
                                <Text style={{fontFamily : 'Roboto-Bold'}}>
                                    Select size
                                </Text>
                            </View>
                            <View>
                                <Ionicons name='close' size={25} />
                            </View>
                        </View>
                        <FlatList
                            data={data}
                            ItemSeparatorComponent={seperator}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={()=>onclick(item)}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                                            <Text>
                                                {item}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}