export function login(username, password, originpwd) {
	return {
		type: 'login',
		originpwd,
		payload: {
			request: {
				url: '/user/login',
				method: 'post',
				data: {
					username,
					password
				}
			}
		}
	}
}

export function resetLoginState() {
	return {
		type: 'resetLoginState',
	}
}

export function regist(username, password) {
	return {
		type: 'regist',
		payload: {
			request: {
				url: '/user/regist',
				method: 'post',
				data: {
					username,
					password
				}
			}
		}
	}
}

export function resetRegistState() {
	return {
		type: 'resetRegistState',
	}
}