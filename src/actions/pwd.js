export function getPwdList(username, password) {
	return {
		type: 'getPwdList',
		payload: {
			request: {
				url: '/pwd/pwdList/get',
				method: 'post',
			}
		}
	}
}

export function addPwd(groupId, key, account, password) {
	return {
		type: 'addPwd',
		payload: {
			request: {
				url: '/pwd/pwd/add',
				method: 'post',
				data: {
					groupId,
					key,
					account,
					password,
				}
			}
		}
	}
}

export function resetAddPwdState() {
	return {
		type: 'resetAddPwdState',
	}
}

export function updatePwd(id, groupId, key, account, password) {
	return {
		type: 'updatePwd',
		payload: {
			request: {
				url: '/pwd/pwd/update',
				method: 'post',
				data: {
					id,
					groupId,
					key,
					account,
					password
				}
			}
		}
	}
}

export function resetUpdatePwdState() {
	return {
		type: 'resetUpdatePwdState',
	}
}

export function deletePwd(id) {
	return {
		type: 'deletePwd',
		payload: {
			request: {
				url: '/pwd/pwd/delete',
				method: 'post',
				data: {
					id
				}
			}
		}
	}
}

export function resetDeletePwdState() {
	return {
		type: 'resetDeletePwdState',
	}
}

export function addGroup(groupName) {
	return {
		type: 'addGroup',
		payload: {
			request: {
				url: '/pwd/group/add',
				method: 'post',
				data: {
					groupName
				}
			}
		}
	}
}

export function resetAddGroupState() {
	return {
		type: 'resetAddGroupState',
	}
}

export function updateGroup(groupId, groupName) {
	return {
		type: 'updateGroup',
		payload: {
			request: {
				url: '/pwd/group/update',
				method: 'post',
				data: {
					groupId,
					groupName
				}
			}
		}
	}
}

export function resetUpdateGroupState() {
	return {
		type: 'resetUpdateGroupState',
	}
}

export function deleteGroup(groupId) {
	return {
		type: 'deleteGroup',
		payload: {
			request: {
				url: '/pwd/group/delete',
				method: 'post',
				data: {
					groupId
				}
			}
		}
	}
}

export function resetDeleteGroupState() {
	return {
		type: 'resetDeleteGroupState',
	}
}
