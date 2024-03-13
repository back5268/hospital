import { getData, postData } from '@lib/axios';

export const getInfoApi = (params) => getData('/auth/getInfo', params);
export const signinApi = (params) => postData('/auth/signin', params);
export const signupApi = (params) => postData('/auth/signup', params);
export const sendOtpForgotPasswordApi = (params) => postData('/auth/sendOtp', params);
export const confirmPasswordApi = (params) => postData('/auth/confirmPassword', params);
export const changePasswordApi = (params) => postData('/changePassword', params);
