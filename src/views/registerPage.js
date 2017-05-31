/**
 * @providesModule RegisterPage
 */
import React, { Component } from 'react';
import {
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Dimensions,
	TextInput,
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

export class RegisterPage extends Component {
	static navigationOptions = {
		title: '注册',
		headerStyle:{
			backgroundColor:'#232323'
		},
		headerTitleStyle:{
			fontSize: 20,
		},
		headerTintColor:'white'
	}

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.registState != this.props.registState) {
			switch (nextProps.registState) {
				case requestState.LOADED:
					Alert.alert('注册成功');
					break;
				case requestState.ERROR:
					Alert.alert('注册失败');
					break;
			}
		}
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#232323' }}>
				<View style={{ marginTop: 100 }}>
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
				<TouchableOpacity style={[styles.button, { marginLeft: 20, marginRight: 20 }]}
					onPress={() => {
						this.props.dispatch(Actions.regist(this.state.username, Crypto.SHA256(this.state.password).toString(Crypto.enc.Hex)));
					}} >
					<Text style={styles.buttonText}>{'注册'}</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	button: {
		borderRadius: 4,
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

const getRegistState = state => state.user.registState;
const getRegistErrorObj = state => state.user.registErrorObj;
const RegisterPageSelector = createSelector([getRegistState,getRegistErrorObj], (registState,registErrorObj) => {
	return {
		registState,
		registErrorObj
	}
});

export default connect(RegisterPageSelector)(RegisterPage);