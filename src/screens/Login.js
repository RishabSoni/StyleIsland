import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Switch
} from 'react-native';
import FormButton from '../components/FormButton';
import Input from '../components/Input';
import { ButtonColor, CommonBackground, SetAuthData, checkEmpty, setLoggedIn } from '../utilities';
import Loader from '../components/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApiCall } from '../api-services';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginID: '',
            Password: '',
            UserType: 'Guest',
            isLoading: false,
            err: ''
        }
    }

    validateForm = () => {
        const { LoginID, Password } = this.state;
        if (checkEmpty(LoginID, Password)) {
            return "Please complete the form";
        } else {
            undefined;
        }
    }

    pressedLogin = async () => {
        const _error = this.validateForm();
        _error ? this.setState({ err: _error }) : this.setState({ err: '' });
        if (!_error) {
            this.setState({ isLoading: true });
            try {
                const res = await ApiCall('https://erp.styleisland.in/SIERPAPI/Webapi/Auth/CheckLogin',
                    'POST', JSON.stringify(this.state), null, true);
                const response = await res.json();
                if (response.Result == 'Success') {
                    SetAuthData(response)
                    //AsyncStorage.setItem('@auth', JSON.stringify(response));
                    setLoggedIn('true');
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'DashBoard', screen: 'DashBoard' }]
                    });
                } else {
                    displayToastMsg('Something Went Wrong')
                }
            } catch (e) {
                console.log(e, "<===login error")
            }
            finally {
                this.setState({ isLoading: false });
            }

            //            console.log(response, "<======login response")
        }
    }

    render() {

        const { navigation } = this.props;
        const { LoginID, Password, isLoading, err } = this.state;


        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <FormButton
                            onClick={() => navigation.goBack()}
                            btnFontFamily='Roboto-Regular'
                            title='X'
                            txtColor='#000'
                            style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}
                        />
                    </View>
                    <View style={{ flex: 0.9 }}>
                        <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
                            <Text style={{
                                fontFamily: 'Roboto-Bold',
                                color: '#000',
                                fontSize: 22
                            }}>
                                Existing Customer
                    </Text>
                        </View>

                        <View style={{ justifyContent: 'center', paddingLeft: 15, marginTop: 15 }}>
                            <Text style={{ fontFamily: 'Roboto-Regular', color: 'red' }}>
                                {err}
                            </Text>
                        </View>

                        <View style={{ padding: 15 }}>
                            <View style={{ marginVertical: 10 }}>
                                <Input
                                    label='Login ID *'
                                    // placeholder="Password" 
                                    onChangeText={text => this.setState({ LoginID: text })}
                                    value={LoginID}
                                    style={[styles.inputStyle, { borderBottomWidth: 0.5 }]}
                                />
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.5, justifyContent: 'center' }}>
                                    <View style={{ flex: 0.98, justifyContent: 'center' }}>
                                        <Input
                                            label='Password *'
                                            // placeholder="Password" 
                                            onChangeText={text => this.setState({ Password: text })}
                                            value={Password}
                                            style={styles.inputStyle}
                                        />
                                    </View>
                                    <View style={{ flex: 0.09, justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name='eye' size={25} />
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 0.55, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Switch
                                            trackColor={{ false: "#000", true: "#81b0ff" }}
                                            thumbColor={"#fff"}
                                            ios_backgroundColor="#3e3e3e"
                                            //onValueChange={toggleSwitch}
                                            value={false}
                                        />
                                    </View>

                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'Roboto-Regular' }}>Remember</Text>
                                    </View>
                                </View>

                                <FormButton
                                    txtColor='#000'
                                    btnFontFamily='Roboto-Regular'
                                    title='Forgot Password ?'
                                    style={{
                                        //  backgroundColor: ButtonColor,
                                        // height: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        //  marginHorizontal: 15
                                    }}
                                    onClick={() => this.props.navigation.navigate('ForgotPassword')}
                                />
                            </View>

                            <FormButton
                                title='Log in'
                                btnFontFamily='Roboto-Regular'
                                style={{
                                    backgroundColor: ButtonColor,
                                    height: 40,
                                    borderRadius: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginVertical: 25,

                                    shadowOffset: {
                                        width: 15,
                                        height: -5
                                    },
                                    // shadowOpacity: 0.1,
                                    // shadowRadius: 5
                                }
                                }
                                onClick={this.pressedLogin}
                            />

                            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                                <Text style={{
                                    fontFamily: 'Roboto-Bold',
                                    color: '#000',
                                    fontSize: 22
                                }}>New Customer ?</Text>
                            </View>

                            <FormButton
                                title='Create Account'
                                txtColor='#000'
                                btnFontFamily='Roboto-Regular'
                                style={{
                                    // backgroundColor: ButtonColor,
                                    borderWidth: 0.5,
                                    height: 40,
                                    borderRadius: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginVertical: 25,

                                    shadowOffset: {
                                        width: 15,
                                        height: -5
                                    },
                                    // shadowOpacity: 0.1,
                                    // shadowRadius: 5
                                }
                                }
                                onClick={() => this.props.navigation.navigate('Register')}
                            />
                        </View>
                    </View>
                    <Loader visible={isLoading} />
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: CommonBackground,
        flex: 1,
    },
    inputStyle: {
        justifyContent: 'center',
        marginTop: 15,
        height: 40
    },
    logoContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        resizeMode: 'contain',
        height: 180,
        width: 180,
    },
    formContainer: {
        flex: 1,
        //   backgroundColor : 'blue',
        justifyContent: 'center',
    },
    bottomTextContainer: {
        flex: 0.25,
        alignItems: 'center',
        //  backgroundColor : 'orange',
        justifyContent: 'flex-end',
        paddingBottom: 50
    }
})