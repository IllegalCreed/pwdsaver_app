/**
 * @providesModule Router
 */

import { StackNavigator, DrawerNavigator, TabNavigator, TabView } from 'react-navigation';

import LoginPage from 'LoginPage';
import RegisterPage from 'RegisterPage';
import MainPage from 'MainPage';

export const MainNavigator = StackNavigator({
	LoginPage: {
		screen: LoginPage
	},
	RegisterPage: {
		screen: RegisterPage
	},
	MainPage: {
		screen: MainPage
	},
}, {
		initialRouteName: 'LoginPage',
		headerMode: 'screen',
	});