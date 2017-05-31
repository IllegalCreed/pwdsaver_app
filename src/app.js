/**
 * @providesModule Root
 */
import React, { Component } from 'react';
import {
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
import AxiosConfig from 'AxiosConfig';
import ReduxConfig from 'ReduxConfig';

import {
	Provider
} from 'react-redux';

import {
	MainNavigator
} from 'Router';

export default class ClientComponent extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (this.navigator) {
			global.RootNavigator = this.navigator._navigation
		}
	}

	render() {
		return (
			<Provider store={global.reduxStore}>
				{
					<MainNavigator ref={navigator => this.navigator = navigator} />
				}
			</Provider>
		)
	}
}