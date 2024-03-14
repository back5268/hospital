import { getData, postData } from '@lib/axios';

export const listMedicalApi = (params) => getData('/listMedical', params);
export const addMedicalApi = (params) => postData('/addMedical', params);
export const updateMedicalApi = (params) => postData('/updateMedical', params);
