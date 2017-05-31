/**
 * @providesModule LoginPage
 */
import React, { Component } from 'react';
import {
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Dimensions,
	TextInput,
	StatusBar,
	Platform,
	Button,
	Alert,
	Image,
	Text,
	View
} from 'react-native';
import Crypto from 'crypto-js';
import { requestState } from 'ReducerUtils';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Actions from 'Actions';

export class LoginPage extends Component {
	static navigationOptions = {
		title: '登录',
		header: null,
	}

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.loginState != this.props.loginState) {
			switch (nextProps.loginState) {
				// case requestState.LOADED:
				// 	Alert.alert('登录成功');
				// 	global.RootNavigator.navigate('MainPage');
				// 	break;
				case requestState.ERROR:
					Alert.alert('登录失败');
					break;
			}
		}

		if (nextProps.isLogin != this.props.isLogin) {
			if (nextProps.isLogin) {
				Alert.alert('登录成功');
				global.RootNavigator.navigate('MainPage');
			}
		}
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#232323' }}>
				<StatusBar
					barStyle="light-content"
				/>
				<Text style={{
					marginTop: 75,
					color: '#FFFFFF',
					fontSize: 36,
					alignSelf: 'center'
				}}>{'拔粪宝'}</Text>
				<View style={{ marginTop: 50 }}>
					<TextInput
						placeholderTextColor="#bfbfbf"
						underlineColorAndroid="transparent"
						style={styles.singleLine}
						placeholder="用户名"
						onChangeText={(text) => this.setState({ username: text })} />
					<View></View>
					<TextInput
						placeholderTextColor="#bfbfbf"
						underlineColorAndroid="transparent"
						style={styles.singleLine}
						placeholder="密码"
						secureTextEntry={true}
						onChangeText={(text) => this.setState({ password: text })} />
				</View>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity style={[styles.button, { marginLeft: 20, marginRight: 5 }]}
						onPress={() => {
							global.RootNavigator.navigate('RegisterPage');
						}} >
						<Text style={styles.buttonText}>{'注册'}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.button, { marginLeft: 5, marginRight: 20 }]}
						onPress={() => {
							this.props.dispatch(Actions.login(this.state.username, Crypto.SHA256(this.state.password).toString(Crypto.enc.Hex),this.state.password));
						}} >
						<Text style={styles.buttonText}>{'登录'}</Text>
					</TouchableOpacity>
				</View>
			</View >
		)
	}
}

var styles = StyleSheet.create({
	button: {
		borderRadius: 4,
		flex: 1,
		marginTop: 10,
		height: 35,
		backgroundColor: '#6e6e6e',
		alignItems: 'center',
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		lineHeight: 30,
	},
	singleLine: {
		borderRadius: 4,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 5,
		backgroundColor: '#3e3e3e',
		color: '#FFFFFF',
		fontSize: 16,
		padding: 0,
		paddingLeft: 15,
		height: 50,
	},
});

const getIsLogin = state => state.user.isLogin;
const getLoginState = state => state.user.loginState;
const getLoginErrorObj = state => state.user.loginErrorObj;
const LoginPageSelector = createSelector([getIsLogin, getLoginState, getLoginErrorObj], (isLogin, loginState, loginErrorObj) => {
	return {
		isLogin,
		loginState,
		loginErrorObj
	}
});

// 将组件与redux连接
export default connect(LoginPageSelector)(LoginPage);