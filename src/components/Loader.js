import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
export default ({ visible }) => {
    return (
        <Modal animationType="slide"
            transparent={true}
            visible={visible}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='red' />
            </View>
        </Modal>
    )
}