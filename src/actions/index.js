/** 
 * @providesModule Actions 
 */
'use strict'

import * as user from './user';
import * as pwd from './pwd';

export default {
  ...user,
	...pwd,
};