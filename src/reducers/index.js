/**
 * @providesModule Reducers 
 */

import { combineReducers } from 'redux';
import { user } from './user';
import { pwd } from './pwd';

export default combineReducers({
	user,
	pwd
});