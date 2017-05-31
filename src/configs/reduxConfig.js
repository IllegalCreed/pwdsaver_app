/**
 * @providesModule ReduxConfig
 */

import {
	AsyncStorage,
} from 'react-native';
import {
	createStore,
	applyMiddleware,
	compose
} from 'redux'
import axiosMiddleware from 'redux-axios-middleware';
import thunkMiddleware from 'redux-thunk';
import {
	persistStore,
	autoRehydrate,
	createTransform
} from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import Reducers from 'Reducers';
import Actions from 'Actions';

global.reduxStore = createStore(
	Reducers,
	compose(
		applyMiddleware(thunkMiddleware, axiosMiddleware(global.axiosClient)),
		autoRehydrate()
	)
);

const saveSubsetFilter_user = createFilter(
	'user',
	['isLogin', 'token', 'password']
);

const persistConfig = {
	whitelist: ['user'],
	storage: AsyncStorage,
	transforms: [
		saveSubsetFilter_user,
	]
};

global.persistor = persistStore(global.reduxStore, persistConfig, (err, restoredState) => {
	if (err) {
		console.log('rehydration error:' + err);
	} else {
		console.log('rehydration complete');
		if (global.reduxStore.getState().user.token && global.reduxStore.getState().user.isLogin) {
			//global.reduxStore.dispatch(Actions.getPwdList());
		}
	}
});