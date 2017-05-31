import { requestState } from 'ReducerUtils';

export const DefaultPwdState = {
	getPwdListState: requestState.UNLOAD,
	addPwdState: requestState.UNLOAD,
	updatePwdState: requestState.UNLOAD,
	deletePwdState: requestState.UNLOAD,
	addGroupState: requestState.UNLOAD,
	updateGroupState: requestState.UNLOAD,
	deleteGroupState: requestState.UNLOAD,

	pwdList: [],

	getPwdListErrorObj: null,
	addPwdErrorObj: null,
	updatePwdErrorObj: null,
	deletePwdErrorObj: null,
	addGroupErrorObj: null,
	updateGroupErrorObj: null,
	deleteGroupErrorObj: null,
}

export function pwd(state = DefaultPwdState, action) {
	switch (action.type) {
		/* getPwdList */
		case 'getPwdList':
			return Object.assign({}, state, {
				getPwdListState: requestState.LOADING,
			})
		case 'getPwdList_SUCCESS':
			let getPwdListResponse = action.payload.data;
			if (getPwdListResponse.result) {
				return Object.assign({}, state, {
					getPwdListState: requestState.LOADED,
					pwdList: getPwdListResponse.groupList,
				});
			} else {
				return Object.assign({}, state, {
					getPwdListState: requestState.ERROR,
					getPwdListErrorObj: getPwdListResponse,
				});
			}
		case 'getPwdList_FAIL':
			return Object.assign({}, state, {
				getPwdListState: requestState.ERROR,
				getPwdListErrorObj: action.error,
			});
		case 'resetGetPwdListState':
			return Object.assign({}, state, {
				getPwdListState: requestState.UNLOAD,
			});

		/* addPwd */
		case 'addPwd':
			return Object.assign({}, state, {
				addPwdState: requestState.LOADING,
			})
		case 'addPwd_SUCCESS':
			let addPwdResponse = action.payload.data;
			if (addPwdResponse.result) {
				return Object.assign({}, state, {
					addPwdState: requestState.LOADED,
				});
			} else {
				return Object.assign({}, state, {
					addPwdState: requestState.ERROR,
					addPwdErrorObj: addPwdResponse,
				});
			}
		case 'addPwd_FAIL':
			return Object.assign({}, state, {
				addPwdState: requestState.ERROR,
				addPwdErrorObj: action.error,
			});
		case 'resetAddPwdState':
			return Object.assign({}, state, {
				addPwdState: requestState.UNLOAD,
			});

		/* updatePwd */
		case 'updatePwd':
			return Object.assign({}, state, {
				updatePwdState: requestState.LOADING,
			})
		case 'updatePwd_SUCCESS':
			let updatePwdResponse = action.payload.data;
			if (updatePwdResponse.result) {
				return Object.assign({}, state, {
					updatePwdState: requestState.LOADED,
				});
			} else {
				return Object.assign({}, state, {
					updatePwdState: requestState.ERROR,
					updatePwdErrorObj: updatePwdResponse,
				});
			}
		case 'updatePwd_FAIL':
			return Object.assign({}, state, {
				updatePwdState: requestState.ERROR,
				updatePwdErrorObj: action.error,
			});
		case 'resetUpdatePwdState':
			return Object.assign({}, state, {
				updatePwdState: requestState.UNLOAD,
			});

		/* deletePwd */
		case 'deletePwd':
			return Object.assign({}, state, {
				deletePwdState: requestState.LOADING,
			})
		case 'deletePwd_SUCCESS':
			let deletePwdResponse = action.payload.data;
			if (deletePwdResponse.result) {
				return Object.assign({}, state, {
					deletePwdState: requestState.LOADED,
				});
			} else {
				return Object.assign({}, state, {
					deletePwdState: requestState.ERROR,
					deleteGroupErrorObj: deletePwdResponse,
				});
			}
		case 'deletePwd_FAIL':
			return Object.assign({}, state, {
				deletePwdState: requestState.ERROR,
				deleteGroupErrorObj: action.error,
			});
		case 'resetDeletePwdState':
			return Object.assign({}, state, {
				deletePwdState: requestState.UNLOAD,
			});

		/* addGroup */
		case 'addGroup':
			return Object.assign({}, state, {
				addGroupState: requestState.LOADING,
			})
		case 'addGroup_SUCCESS':
			let addGroupResponse = action.payload.data;
			if (addGroupResponse.result) {
				return Object.assign({}, state, {
					addGroupState: requestState.LOADED,
				});
			} else {
				return Object.assign({}, state, {
					addGroupState: requestState.ERROR,
					addGroupErrorObj: addGroupResponse,
				});
			}
		case 'addGroup_FAIL':
			return Object.assign({}, state, {
				addGroupState: requestState.ERROR,
				addGroupErrorObj: action.error,
			});
		case 'resetAddGroupState':
			return Object.assign({}, state, {
				addGroupState: requestState.UNLOAD,
			});

		/* updateGroup */
		case 'updateGroup':
			return Object.assign({}, state, {
				updateGroupState: requestState.LOADING,
			})
		case 'updateGroup_SUCCESS':
			let updateGroupResponse = action.payload.data;
			if (updateGroupResponse.result) {
				return Object.assign({}, state, {
					updateGroupState: requestState.LOADED,
				});
			} else {
				return Object.assign({}, state, {
					updateGroupState: requestState.ERROR,
					updateGroupErrorObj: updateGroupResponse,
				});
			}
		case 'updateGroup_FAIL':
			return Object.assign({}, state, {
				updateGroupState: requestState.ERROR,
				updateGroupErrorObj: action.error,
			});
		case 'resetUpdateGroupState':
			return Object.assign({}, state, {
				updateGroupState: requestState.UNLOAD,
			});

		/* deleteGroup */
		case 'deleteGroup':
			return Object.assign({}, state, {
				deleteGroupState: requestState.LOADING,
			})
		case 'deleteGroup_SUCCESS':
			let deleteGroupResponse = action.payload.data;
			if (deleteGroupResponse.result) {
				return Object.assign({}, state, {
					deleteGroupState: requestState.LOADED,
				});
			} else {
				return Object.assign({}, state, {
					deleteGroupState: requestState.ERROR,
					deleteGroupErrorObj: deleteGroupResponse,
				});
			}
		case 'deleteGroup_FAIL':
			return Object.assign({}, state, {
				deleteGroupState: requestState.ERROR,
				deleteGroupErrorObj: action.error,
			});
		case 'resetDeleteGroupState':
			return Object.assign({}, state, {
				deleteGroupState: requestState.UNLOAD,
			});

		default:
			return state;
	}
}