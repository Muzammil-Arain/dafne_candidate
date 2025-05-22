import { makeAction, makeRequesActions } from '../ActionTypes';
import { createReducer } from '@reduxjs/toolkit';

// export const VARIFY_EMAIL_API = makeRequesActions('VARIFY_EMAIL');

export const LOGIN_API = makeRequesActions('LOGIN');
export const REGISTER_STEP_1_API = makeRequesActions('SIGNUP_STEP_1');
export const REGISTER_STEP_2_API = makeRequesActions('SIGNUP_STEP_2');
export const OTP_VERIFICATION_API = makeRequesActions('OTP_VERIFICATION');
export const VERIFY_EMAIL_API = makeRequesActions('VERIFY_EMAIL');
export const RESET_PASSWORD_API = makeRequesActions('RESET_PASSWORD');
export const FORGOT_PASSWORD_API = makeRequesActions('API_FORGOT_PASSWORD');
export const UPDATE_PROFILE_API = makeRequesActions('UPDATE_PROFILE');
export const loginAccesToken = makeAction('LOGIN_ACCESS_TOKEN');
export const LOGOUT_API = makeRequesActions('API_LOGOUT');
export const CHANGE_EMAIL_API = makeRequesActions('CHANGE_EMAIL');


const initalState = {
  data: {},
  accessToken: false,
};

export default createReducer(initalState, builder => {
  builder.addCase(LOGIN_API.success, (state, action) => {
    const { data } = action.payload;
    state.data = data;
  });
  builder.addCase(VERIFY_EMAIL_API.success, (state, action) => { });
  builder.addCase(CHANGE_EMAIL_API.success, (state, action) => { });
  builder.addCase(LOGOUT_API.success, (state, action) => { });
  builder.addCase(FORGOT_PASSWORD_API.success, (state, action) => { });
  builder.addCase(RESET_PASSWORD_API.success, (state, action) => { });

  builder.addCase(REGISTER_STEP_1_API.success, (state, action) => { });
  builder.addCase(REGISTER_STEP_2_API.success, (state, action) => { });
  builder.addCase(OTP_VERIFICATION_API.success, (state, action) => { });
  builder.addCase(UPDATE_PROFILE_API.success, (state, action) => {
    const { data } = action.payload;
    state.data = { ...state.data, user: data.user };
  });
  builder.addCase(loginAccesToken, (state, action) => {
    state.accessToken = action.payload.token;
  });
});

export const loginUser = state => state?.auth.data?.user;
export const getUserData = state => state?.auth?.data?.user;
export const loginAccessToken = state => state?.auth?.data?.access_token;
export const sessionMantainAccessToken = state => state.auth?.accessToken ?? false;




