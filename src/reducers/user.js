import { requestState } from 'ReducerUtils';

export const DefaultUserState = {
	loginState: requestState.UNLOAD,
	registState: requestState.UNLOAD,

	isLogin: false,
	token: null,
	password:'',

	loginErrorObj: null,
	registErrorObj: null,
}

export function user(state = DefaultUserState, action) {
	switch (action.type) {
		/* login */
		case 'login':
			return Object.assign({}, state, {
				loginState: requestState.LOADING,
				isLogin: false,
				password: action.payload.request.data.password
			})
		case 'login_SUCCESS':
			let loginResponse = action.payload.data;
			if (loginResponse.result) {
				return Object.assign({}, state, {
					loginState: requestState.LOADED,
					isLogin: true,
					token: loginResponse.token,
				});
			} else {
				return Object.assign({}, state, {
					loginState: requestState.ERROR,
					loginErrorObj: loginResponse,
					isLogin: false,
					token: null,
				});
			}
		case 'login_FAIL':
			return Object.assign({}, state, {
				loginState: requestState.ERROR,
				loginErrorObj: action.error,
				isLogin: false,
				token: null,
			});
		case 'resetLoginState':
			return Object.assign({}, state, {
				loginState: requestState.UNLOAD,
			});

		/* regist */
		case 'regist':
			return Object.assign({}, state, {
				registState: requestState.LOADING,
			})
		case 'regist_SUCCESS':
			let registResponse = action.payload.data;
			if (registResponse.result) {
				return Object.assign({}, state, {
					registState: requestState.LOADED,
				});
			} else {
				return Object.assign({}, state, {
					registState: requestState.ERROR,
					registErrorObj: registResponse,
				});
			}
		case 'regist_FAIL':
			return Object.assign({}, state, {
				registState: requestState.ERROR,
				registErrorObj: action.error,
			});
		case 'resetRegistState':
			return Object.assign({}, state, {
				registState: requestState.UNLOAD,
			});


		default:
			return state;
	}
}