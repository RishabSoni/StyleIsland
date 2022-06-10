import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';
import Input from '../components/Input';
import Loader from '../components/Loader';
import FormButton from '../components/FormButton';
import { ButtonColor, CommonBackground, checkEmpty, displayToastMsg, checkEmail } from '../utilities';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApiCall } from '../api-services';

const { height } = Dimensions.get('window');
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            Mobile: '',
            Email: '',
            Name: '',
            Address: '',
            City: '',
            State: '',
            Country: '',
            ZipCode: '',
            Password: '',
            err: ''
        }
    }

    validate = () => {
        const { Mobile, Email, Name, Address, State, City, ZipCode, Password, Country } = this.state;
        if (checkEmpty(Mobile, Email, Name, Address, State, City, ZipCode, Password, Country)) {
            return "Please complete the form";
        } else if (!checkEmail(Email)) {
            return "Email is not correct";
        } else {
            undefined;
        }
    }

    submitPressed = () => {
        const _error = this.validate();
        console.log(_error, "<==_error")
        if (_error) {
            this.setState({ err: _error })
            displayToastMsg(_error);
        } else {
            this.setState({ err: '' })
            this.hittingRegister(this.state)
        }
        //  _error ? displayToastMsg(_error) : this.props.hitRegisterApi(this.state);
    }

    hittingRegister = async (data) => {
        try {
            this.setState({ isLoading: true })
            const res = await ApiCall(
                `https://erp.styleisland.in/SIERPAPI/Webapi/Auth/GuestSignUp`,
                'POST',
                JSON.stringify(data),
                null,
                true
            );
            const result = await res.json();
            if (result.Result == 'Success') {
                displayToastMsg(result.Message);
                this.props.navigation.navigate('Login')
            } else {
                displayToastMsg('Something went wrong.')
            }
        } catch (e) {
            console.log(e, "<===HiitingRegister")
        }
        finally {
            this.setState({ isLoading: false })
        }
    }

    render() {
        const { navigation } = this.props;
        const { Mobile, Email, Name, Address, State, City, ZipCode, Password, Country, isLoading } = this.state;
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={{ flex: 1 }}>
                    <Loader visible={isLoading} />
                    <View style={[styles.logoContainer,{paddingHorizontal : 15}]}>
                        <View style={{ justifyContent: 'center', width: 65 }}>
                            <FormButton
                                txtColor='#000'
                                btnFontFamily='Roboto-Bold'
                                title='X'
                                onClick={() => navigation.goBack()}
                                style={{ padding: 10 }}
                            />
                        </View>
                        <View style={{ justifyContent: 'center', width: 65 }}>
                            <FormButton
                                onClick={() => navigation.navigate('Login')}
                                txtColor='#000'
                                btnFontFamily='Roboto-Bold'
                                title='Log in'
                                style={{ padding: 10 }}
                            />
                        </View>
                    </View>
                    <View style={[styles.formContainer, { flex: 1 }]}>
                        <View style={{ justifyContent: 'center', padding: 25 }}>
                            <Text style={{
                                fontFamily: 'Roboto-Bold',
                                color: '#000',
                                fontSize: 22
                            }}>
                                New Customer
                            </Text>

                            <View style={{ justifyContent: 'center', marginVertical: 10 }}>
                                <Text style={{ fontFamily: 'Roboto-Regular', color: 'red' }}>
                                    {this.state.err}
                                </Text>
                            </View>

                            <Input
                                label='Full Name *'
                                // placeholder="Password" 
                                onChangeText={text => this.setState({ Name: text })}
                                value={Name}
                                style={[styles.inputStyle, { borderBottomWidth: 0.5 }]}
                            />

                            <Input
                                label='Email *'
                                keyboardType='email-address'
                                onChangeText={text => this.setState({ Email: text })}
                                value={Email}
                                style={[styles.inputStyle, { borderBottomWidth: 0.5 }]}
                            />
                            <Input
                                label='Password *'
                                secureTextEntry={true}
                                // placeholder="Password" 
                                onChangeText={text => this.setState({ Password: text })}
                                value={Password}
                                style={[styles.inputStyle, { borderBottomWidth: 0.5 }]}
                            />

                            <Input
                                label='Mobile *'
                                maxLength={10}
                                // placeholder="Password" 
                                onChangeText={text => this.setState({ Mobile: text })}
                                value={Mobile}
                                max={10}
                                keyboardType='Phone-pad'
                                style={[styles.inputStyle, { borderBottomWidth: 0.5 }]}
                            />

                            <Input
                                label='Address *'
                                // placeholder="Password" 
                                onChangeText={text => this.setState({ Address: text })}
                                value={Address}
                                style={[styles.inputStyle, { borderBottomWidth: 0.5 }]}
                            />

                            <Input
                                label='City *'
                                // placeholder="Password" 
                                onChangeText={text => this.setState({ City: text })}
                                value={City}
                                style={[styles.inputStyle, { borderBottomWidth: 0.5 }]}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 0.47, flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Input
                                            label='State *'
                                            // placeholder="Password" 
                                            onChangeText={text => this.setState({ State: text })}
                                            value={State}
                                            style={styles.inputStyle}
                                        />
                                    </View>
                                    <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name='caret-down' />
                                    </View>
                                </View>
                                <View style={{ flex: 0.47, flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Input
                                            label='ZipCode *'
                                            maxLength={6}
                                            keyboardType='Phone-pad'
                                            onChangeText={text => this.setState({ ZipCode: text })}
                                            value={ZipCode}
                                            style={styles.inputStyle}
                                        />
                                    </View>
                                    <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name='caret-down' />
                                    </View>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                <View style={{ flex: 0.98, justifyContent: 'center' }}>
                                    <Input
                                        label='Country *'
                                        // placeholder="Password" 
                                        onChangeText={text => this.setState({ Country: text })}
                                        value={Country}
                                        style={styles.inputStyle}
                                    />
                                </View>
                                <View style={{ flex: 0.09, justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name='caret-down' />
                                </View>
                            </View>

                            <View style={{ justifyContent: 'space-between' }}>
                                <FormButton
                                    btnFontFamily='Roboto-Regular'
                                    title='Create Account'
                                    style={styles.btnStyle}
                                    onClick={this.submitPressed}
                                />

                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: height / 8 }}>
                                    <Text style={{ fontFamily: 'Roboto-Bold' }}>
                                        Terms of use and Privacy Policy
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: CommonBackground
    },
    inputStyle: {
        justifyContent: 'center',
        marginTop: 15,
        height: 40
    },
    logoContainer: {
        flex: 0.1,
        height: 70,
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'green'
    },
    logo: {
        resizeMode: 'contain',
        height: 180,
        width: 180
    },
    formContainer: {
        flex: 0.9,
        //  backgroundColor:'orange',
        //  justifyContent: 'center',
    },
    bottomTextContainer: {
        flex: 0.25,
        alignItems: 'center',
        //  backgroundColor : 'orange',
        justifyContent: 'flex-end',
        paddingBottom: 50
    },
    btnStyle: {
        backgroundColor: ButtonColor,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 45,
        borderRadius: 0
    }
})