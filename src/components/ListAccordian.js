import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HTML from "react-native-render-html";

export default ({ toggle, title, content }) => {
    const [expand, setExpand] = React.useState(true);
    const iconName = expand ? 'chevron-up' : 'chevron-down';

    React.useEffect(() => {
        setExpand(!toggle);
    }, [])

    return (
        <View style={{ marginVertical: 5 }}>
            <TouchableOpacity onPress={() => setExpand(!expand)} activeOpacity={0.5}>
                <View style={{ height: 35, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Roboto-Regular' }}>
                            {title}
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name={iconName} />
                    </View>
                </View>
                {expand ?
                    <View>
                        {/* <Text>
                            {content.replace(/(<([^>]+)>)/ig, '')}
                        </Text> */}
                        <HTML baseFontStyle={{ fontFamily: 'Roboto-Regular' }} source={{ html: content.replace(/(<([^>]+)>)/ig, '') }}  />
                    </View> : null}
            </TouchableOpacity>
        </View>
    )
}

