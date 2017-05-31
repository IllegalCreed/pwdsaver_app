/**
 * @providesModule AxiosConfig
 */

import axios from 'axios';
import Actions from 'Actions';

global.axiosClient = axios.create({
	baseURL: 'http://47.93.223.173:3000/api',
  // baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  responseType: 'json',
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  transformRequest: [function (data) {
    if (data) {
      data.token = global.reduxStore.getState().user.token;
    }
    else {
      data = {
        token: global.reduxStore.getState().user.token
      }
    }
    return JSON.stringify(data);
  }],
  transformResponse: [function (data) {

    return data;
  }],
});