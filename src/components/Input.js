import React from 'react';
import { View, TextInput, Text, ImageBackground, Animated } from 'react-native';
import { ButtonColor } from '../utility/utilities';



export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false
        }

    }

    componentWillMount() {
        this.animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }

    componentDidUpdate() {
        Animated.timing(this.animatedIsFocused, {
            toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
            duration: 200,
            useNativeDriver: false
        }).start()
    //    console.log('hii called')
    }

    render() {
        const { label, isValid, handleChange, style, value } = this.props;
        const { isFocused } = this.state;
        //console.log(value, "<===value")
        const labelStyle = {
            position: 'absolute',
            left: 0,
            top: this.animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 0],
            }),
            fontSize: this.animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [13, 13],
            }),
            color: this.animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#aaa', '#000'],
            })
        };

        return (
            <View style={{ flex: 1, justifyContent: "center", marginTop: 10 }}>
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>
                <TextInput
                    // placeholder="Email"
                    onChangeText={handleChange}
                    {...this.props}
                    
                    style={style}
                    onFocus={() => this.setState({ isFocused: true })}
                    onBlur={() => this.setState({ isFocused: false })}
                />
            </View>
        )
    }
};
