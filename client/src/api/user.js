import { getData, postData } from '@lib/axios';

export const listUserApi = (params) => getData('/listUser', params);
export const addUserApi = (params) => postData('/addUser', params);
