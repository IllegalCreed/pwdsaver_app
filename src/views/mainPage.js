/**
 * @providesModule MainPage
 */
import React, { Component } from 'react';
import {
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	TouchableOpacity,
	SectionList,
	ScrollView,
	StyleSheet,
	Dimensions,
	TextInput,
	Platform,
	Button,
	Modal,
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

export class MainPage extends Component {
	static navigationOptions = {
		title: '拔粪宝',
		headerStyle: {
			backgroundColor: '#232323'
		},
		headerTitleStyle: {
			fontSize: 20,
		},
		headerTintColor: 'white'
	}

	constructor(props) {
		super(props);
		this.state = {
			addPwdModalVisible: false,
			addGroupModalVisible: false,
			updateGroupModalVisible: false,
			updatePwdModalVisible: false,
			key: '',
			account: '',
			password: '',
			newPassword: '',
			currentPwdId: '',
			currentGroupId: '',
			currentGroupName: '',
			tempGroupName: '',
			currentSelectPwd: '',
		}
		this.renderSectionHeader = this.renderSectionHeader.bind(this);
		this.renderItemComponent = this.renderItemComponent.bind(this);
		this.pwdHasSameKey = this.pwdHasSameKey.bind(this);
		this.pwdHasSameKeyWithoutSelf = this.pwdHasSameKeyWithoutSelf.bind(this);
		this.groupHasSameKey = this.groupHasSameKey.bind(this);
		this.groupHasSameKeyWithoutSelf = this.groupHasSameKeyWithoutSelf.bind(this);
		this.props.dispatch(Actions.getPwdList());
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.addPwdState != this.props.addPwdState) {
			switch (nextProps.addPwdState) {
				case requestState.LOADED:
					this.props.dispatch(Actions.getPwdList());
					this.props.dispatch(Actions.resetAddPwdState());
					console.log('添加密码成功');
					break;
				case requestState.ERROR:
					console.log('添加密码失败');
					break;
			}
		}

		if (nextProps.updatePwdState != this.props.updatePwdState) {
			switch (nextProps.updatePwdState) {
				case requestState.LOADED:
					this.props.dispatch(Actions.getPwdList());
					this.props.dispatch(Actions.resetUpdatePwdState());
					console.log('更新密码成功');
					break;
				case requestState.ERROR:
					console.log('更新密码失败');
					break;
			}
		}

		if (nextProps.deletePwdState != this.props.deletePwdState) {
			switch (nextProps.deletePwdState) {
				case requestState.LOADED:
					this.props.dispatch(Actions.getPwdList());
					this.props.dispatch(Actions.resetDeletePwdState());
					console.log('删除密码成功');
					break;
				case requestState.ERROR:
					console.log('删除密码失败');
					break;
			}
		}

		if (nextProps.addGroupState != this.props.addGroupState) {
			switch (nextProps.addGroupState) {
				case requestState.LOADED:
					this.props.dispatch(Actions.getPwdList());
					this.props.dispatch(Actions.resetAddGroupState());
					console.log('添加分组成功');
					break;
				case requestState.ERROR:
					console.log('添加分组失败');
					break;
			}
		}

		if (nextProps.updateGroupState != this.props.updateGroupState) {
			switch (nextProps.updateGroupState) {
				case requestState.LOADED:
					this.props.dispatch(Actions.getPwdList());
					this.props.dispatch(Actions.resetUpdateGroupState());
					console.log('更新分组成功');
					break;
				case requestState.ERROR:
					console.log('更新分组失败');
					break;
			}
		}

		if (nextProps.deleteGroupState != this.props.deleteGroupState) {
			switch (nextProps.deleteGroupState) {
				case requestState.LOADED:
					this.props.dispatch(Actions.getPwdList());
					this.props.dispatch(Actions.resetDeleteGroupState());
					console.log('删除分组成功');
					break;
				case requestState.ERROR:
					console.log('删除分组失败');
					break;
			}
		}
	}

	renderSectionHeader({ section }) {
		return (
			<TouchableOpacity onLongPress={() => {
				this.setState({ updateGroupModalVisible: true, currentGroupName: section.groupName, currentGroupId: section.key, tempGroupName: section.groupName })
			}}>
				<View style={{
					justifyContent: 'space-between',
					flexDirection: 'row',
					alignItems: 'center',
					backgroundColor: '#3b3b3b',
					paddingLeft: 10,
					paddingRight: 15,
					height: 40
				}}>
					<Text style={{
						color: 'white',
						fontSize: 20,
						fontWeight: 'bold'
					}}>{section.groupName}</Text>
					<TouchableOpacity
						onPress={() => {
							this.setState({ addPwdModalVisible: true, currentGroupName: section.groupName, currentGroupId: section.key })
						}} >
						<Text style={{ fontSize: 30, color: 'white', marginTop: -4 }}>{'+'}</Text>
					</TouchableOpacity>
				</View>
			</TouchableOpacity >
		)
	}

	renderItemComponent({ item }) {
		if (this.state.currentSelectPwd == item.pid) {
			let decrypted = Crypto.AES.decrypt(item.pwd, this.props.password);
			return (
				<TouchableOpacity
					onPress={() => {
						this.setState({ currentSelectPwd: '' });
					}}
					onLongPress={() => {
						this.setState({ updatePwdModalVisible: true, key: item.key, account: item.account, password: item.pwd, newPassword: '', currentPwdId: item.pid, currentGroupId: item.gid })
					}}>
					<View style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						paddingLeft: 10,
						height: 35
					}}>
						<Text style={{
							color: '#7EC880',
							fontSize: 16,
							marginLeft: 10,
						}}>{item.account}</Text>
						<Text style={{
							color: '#80C080',
							fontSize: 16,
							marginRight: 15,
						}}>{decrypted.toString(Crypto.enc.Utf8)}</Text>
					</View>
				</TouchableOpacity>
			)
		} else {
			return (
				<TouchableOpacity
					onPress={() => {
						this.setState({ currentSelectPwd: item.pid });
					}}
					onLongPress={() => {
						this.setState({ updatePwdModalVisible: true, key: item.key, account: item.account, password: item.pwd, newPassword: '', currentPwdId: item.pid, currentGroupId: item.gid })
					}}>
					<View style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						paddingLeft: 10,
						height: 35
					}}>
						<Text style={{
							color: 'white',
							fontSize: 16,
							marginLeft: 10,
						}}>{item.key}</Text>
						<Text style={{
							color: 'white',
							fontSize: 16,
							marginRight: 15,
						}}>{item.account}</Text>
					</View>
				</TouchableOpacity>
			)
		}
	}

	groupHasSameKey(key) {
		for (let group of this.props.pwdList) {
			if (group.groupName == key) {
				return true;
			}
		}
		return false;
	}

	groupHasSameKeyWithoutSelf(key, id) {
		for (let group of this.props.pwdList) {
			if (group.groupName == key && group.key != id) {
				return true;
			}
		}
		return false;
	}

	pwdHasSameKey(key) {
		for (let group of this.props.pwdList) {
			for (let pwd of group.data) {
				if (pwd.key == key) {
					return true;
				}
			}
		}
		return false;
	}

	pwdHasSameKeyWithoutSelf(key, id) {
		for (let group of this.props.pwdList) {
			for (let pwd of group.data) {
				if (pwd.key == key && id != pwd.pid) {
					return true;
				}
			}
		}
		return false;
	}

	render() {
		const Container = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
		return (
			<View style={{ flex: 1, backgroundColor: '#232323' }}>
				<Modal
					animationType={"fade"}
					transparent={true}
					visible={this.state.addPwdModalVisible}>
					<Container behavior={'padding'} style={{
						flex: 1,
						backgroundColor: '#00000088',
						justifyContent: 'flex-end',
					}}>
						<TouchableWithoutFeedback
							style={{ flex: 1 }}
							onPress={() => {
								this.setState({ addPwdModalVisible: false })
							}}>
							<View style={{ flex: 1 }}></View>
						</TouchableWithoutFeedback>
						<View style={{
							height: 270,
							backgroundColor: '#232323',
						}}>
							<View style={{ height: 1, backgroundColor: '#666666', marginBottom: 15 }} />
							<Text style={{
								color: 'white',
								fontSize: 16,
								marginLeft: 12,
								marginBottom: 15
							}}>{'向' + this.state.currentGroupName + '中添加新密码'}</Text>
							<TextInput
								placeholderTextColor="#bfbfbf"
								underlineColorAndroid="transparent"
								style={styles.singleLine}
								placeholder="名称"
								onChangeText={(text) => this.setState({ key: text })} />
							<TextInput
								placeholderTextColor="#bfbfbf"
								underlineColorAndroid="transparent"
								style={styles.singleLine}
								placeholder="账号"
								onChangeText={(text) => this.setState({ account: text })} />
							<TextInput
								placeholderTextColor="#bfbfbf"
								underlineColorAndroid="transparent"
								style={styles.singleLine}
								placeholder="密码"
								onChangeText={(text) => this.setState({ password: text })} />
							<TouchableOpacity style={[styles.button, { marginLeft: 20, marginRight: 20 }]}
								onPress={() => {
									if (this.pwdHasSameKey(this.state.key)) {
										Alert.alert('名称重复');
										return;
									}
									let encrypted = Crypto.AES.encrypt(this.state.password, this.props.password);
									this.props.dispatch(Actions.addPwd(this.state.currentGroupId, this.state.key, this.state.account, encrypted.toString()));
									this.setState({ addPwdModalVisible: false });
								}} >
								<Text style={styles.buttonText}>{'添加'}</Text>
							</TouchableOpacity>
						</View>
					</Container>
				</Modal>
				<Modal
					animationType={"fade"}
					transparent={true}
					visible={this.state.addGroupModalVisible}>
					<Container behavior={'padding'} style={{
						flex: 1,
						backgroundColor: '#00000088',
						justifyContent: 'flex-end',
					}}>
						<TouchableWithoutFeedback
							style={{ flex: 1 }}
							onPress={() => {
								this.setState({ addGroupModalVisible: false })
							}}>
							<View style={{ flex: 1 }}></View>
						</TouchableWithoutFeedback>
						<View style={{
							height: 130,
							backgroundColor: '#232323',
						}}>
							<View style={{ height: 1, backgroundColor: '#666666', marginBottom: 15 }} />
							<TextInput
								placeholderTextColor="#bfbfbf"
								underlineColorAndroid="transparent"
								style={styles.singleLine}
								placeholder="分组名称"
								onChangeText={(text) => this.setState({ currentGroupName: text })} />
							<TouchableOpacity style={[styles.button, { marginLeft: 20, marginRight: 20 }]}
								onPress={() => {
									if (this.groupHasSameKey(this.state.currentGroupName)) {
										Alert.alert('名称重复');
										return;
									}
									this.props.dispatch(Actions.addGroup(this.state.currentGroupName));
									this.setState({ addGroupModalVisible: false });
								}} >
								<Text style={styles.buttonText}>{'添加'}</Text>
							</TouchableOpacity>
						</View>
					</Container>
				</Modal>
				<Modal
					animationType={"fade"}
					transparent={true}
					visible={this.state.updateGroupModalVisible}>
					<Container behavior={'padding'} style={{
						flex: 1,
						backgroundColor: '#00000088',
						justifyContent: 'flex-end',
					}}>
						<TouchableWithoutFeedback
							style={{ flex: 1 }}
							onPress={() => {
								this.setState({ updateGroupModalVisible: false })
							}}>
							<View style={{ flex: 1 }}></View>
						</TouchableWithoutFeedback>
						<View style={{
							height: 160,
							backgroundColor: '#232323',
						}}>
							<View style={{ height: 1, backgroundColor: '#666666', marginBottom: 15 }} />
							<Text style={{
								color: 'white',
								fontSize: 16,
								marginLeft: 12,
								marginBottom: 15
							}}>{'修改' + this.state.tempGroupName}</Text>
							<TextInput
								placeholderTextColor="#bfbfbf"
								underlineColorAndroid="transparent"
								style={styles.singleLine}
								placeholder="名称"
								value={this.state.currentGroupName}
								onChangeText={(text) => this.setState({ currentGroupName: text })} />
							<View style={{ flexDirection: 'row' }}>
								<TouchableOpacity style={[styles.button, { marginLeft: 20, marginRight: 10, flex: 1 }]}
									onPress={() => {
										if (this.groupHasSameKeyWithoutSelf(this.state.currentGroupName, this.state.currentGroupId)) {
											Alert.alert('名称重复');
											return;
										}
										this.props.dispatch(Actions.updateGroup(this.state.currentGroupId, this.state.currentGroupName));
										this.setState({ updateGroupModalVisible: false });
									}} >
									<Text style={styles.buttonText}>{'修改'}</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[styles.button, { marginLeft: 10, marginRight: 20, flex: 1 }]}
									onPress={() => {
										this.props.dispatch(Actions.deleteGroup(this.state.currentGroupId));
										this.setState({ updateGroupModalVisible: false });
									}} >
									<Text style={styles.buttonText}>{'删除'}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Container>
				</Modal>
				<Modal
					animationType={"fade"}
					transparent={true}
					visible={this.state.updatePwdModalVisible}>
					<Container behavior={'padding'} style={{
						flex: 1,
						backgroundColor: '#00000088',
						justifyContent: 'flex-end',
					}}>
						<TouchableWithoutFeedback
							style={{ flex: 1 }}
							onPress={() => {
								this.setState({ updatePwdModalVisible: false })
							}}>
							<View style={{ flex: 1 }}></View>
						</TouchableWithoutFeedback>
						<View style={{
							height: 270,
							backgroundColor: '#232323',
						}}>
							<View style={{ height: 1, backgroundColor: '#666666', marginBottom: 15 }} />
							<Text style={{
								color: 'white',
								fontSize: 16,
								marginLeft: 12,
								marginBottom: 15
							}}>{'修改密码'}</Text>
							<TextInput
								placeholderTextColor="#bfbfbf"
								underlineColorAndroid="transparent"
								style={styles.singleLine}
								placeholder="名称"
								value={this.state.key}
								onChangeText={(text) => this.setState({ key: text })} />
							<TextInput
								placeholderTextColor="#bfbfbf"
								underlineColorAndroid="transparent"
								style={styles.singleLine}
								placeholder="账号"
								value={this.state.account}
								onChangeText={(text) => this.setState({ account: text })} />
							<TextInput
								placeholderTextColor="#bfbfbf"
								underlineColorAndroid="transparent"
								style={styles.singleLine}
								placeholder="密码"
								value={this.state.newPassword}
								onChangeText={(text) => this.setState({ newPassword: text })} />
							<View style={{ flexDirection: 'row' }}>
								<TouchableOpacity style={[styles.button, { marginLeft: 20, marginRight: 10, flex: 1 }]}
									onPress={() => {
										if (this.pwdHasSameKeyWithoutSelf(this.state.key, this.state.currentPwdId)) {
											Alert.alert('名称重复');
											return;
										}
										let pwd = '';
										if (this.state.newPassword == '') {
											pwd = this.state.password;
										} else {
											let encrypted = Crypto.AES.encrypt(this.state.newPassword, this.props.password);
											pwd = encrypted.toString();
										}
										this.props.dispatch(Actions.updatePwd(this.state.currentPwdId, this.state.currentGroupId, this.state.key, this.state.account, pwd));
										this.setState({ updatePwdModalVisible: false });
									}} >
									<Text style={styles.buttonText}>{'修改'}</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[styles.button, { marginLeft: 10, marginRight: 20, flex: 1 }]}
									onPress={() => {
										this.props.dispatch(Actions.deletePwd(this.state.currentPwdId));
										this.setState({ updatePwdModalVisible: false });
									}} >
									<Text style={styles.buttonText}>{'删除'}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Container>
				</Modal>
				<SectionList
					ListFooterComponent={F =>
						<TouchableOpacity style={[styles.button, { marginLeft: 20, marginRight: 20, marginBottom: 50, marginTop: 15 }]}
							onPress={() => {
								this.setState({ addGroupModalVisible: true });
							}} >
							<Text style={styles.buttonText}>{'添加分组'}</Text>
						</TouchableOpacity>
					}
					SectionSeparatorComponent={() =>
						<View style={{ height: 2, backgroundColor: '#232323' }} />
					}
					ItemSeparatorComponent={() =>
						<View style={{ height: 1, backgroundColor: 'black' }} />
					}
					renderItem={this.renderItemComponent}
					renderSectionHeader={this.renderSectionHeader}
					sections={this.props.pwdList}
				/>
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

const getPwdList = state => state.pwd.pwdList;
const getPwd = state => state.user.password;
const getAddPwdState = state => state.pwd.addPwdState
const getUpdatePwdState = state => state.pwd.updatePwdState
const getDeletePwdState = state => state.pwd.deletePwdState
const getAddGroupState = state => state.pwd.addGroupState
const getUpdateGroupState = state => state.pwd.updateGroupState
const getDeleteGroupState = state => state.pwd.deleteGroupState
const MainPageSelector = createSelector([getPwdList, getPwd, getAddPwdState, getUpdatePwdState, getDeletePwdState, getAddGroupState, getUpdateGroupState, getDeleteGroupState], (pwdList, password, addPwdState, updatePwdState, deletePwdState, addGroupState, updateGroupState, deleteGroupState) => {
	return {
		pwdList,
		password,
		addPwdState,
		updatePwdState,
		deletePwdState,
		addGroupState,
		updateGroupState,
		deleteGroupState,
	}
});
export default connect(MainPageSelector)(MainPage);