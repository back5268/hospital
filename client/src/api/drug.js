import { getData, postData } from '@lib/axios';

export const listDrugApi = (params) => getData('/listDrug', params);
export const addDrugApi = (params) => postData('/addDrug', params);
