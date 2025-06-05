import { take, put, fork, call } from 'redux-saga/effects';

import {
  API_FORGOT_PASSWORD,
  API_LOGIN,
  API_RESET_PASSWORD,
  SIGNUP_STEP_2,
  SIGNUP_STEP_1,
  OTP_VERIFICATION,
  UPDATE_PROFILE,
  VERIFY_EMAIL,
  ACCEPT_INVITATIONS,
  API_LOGOUT,
  CHANGE_EMAIL,
} from '../../config/WebService';
import { Util } from '../../utils';
import { callRequest } from '../../utils/ApiSauce';

import {
  //EXTRA DATA
  FORGOT_PASSWORD_API,
  LOGIN_API,
  RESET_PASSWORD_API,
  REGISTER_STEP_1_API,
  REGISTER_STEP_2_API,
  OTP_VERIFICATION_API,
  UPDATE_PROFILE_API,
  VERIFY_EMAIL_API,
  CHANGE_EMAIL_API,
} from './';
import { ACCEPT_INVITATIONS_API, LOGOUT_API } from '../app';

function* watchLogin() {
  while (true) {
    const { payload } = yield take(LOGIN_API.request.type);
    const { payloadApi, cb,cberr } = payload;
    try {
      const response = yield call(callRequest, API_LOGIN, payloadApi);
      yield put(LOGIN_API.success({ data: response?.data }));
      cb?.(response);
    } catch (error) {
      cberr?.(error);
      yield put(LOGIN_API.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchRegisterPage1() {
  while (true) {
    const { payload } = yield take(REGISTER_STEP_1_API.request.type);
    const { payloadApi, cb ,cbErr} = payload;
    try {
      const response = yield call(callRequest, SIGNUP_STEP_1, payloadApi);
      yield put(REGISTER_STEP_1_API.success({ data: response?.data }));
      cb?.(response);
    } catch (error) {
      yield put(REGISTER_STEP_1_API.failure({ errorMessage: error.message }));
      cbErr?.(error)
      Util.showMessage(error.message);
    }
  }
}

function* watchRegisterPage2() {
  while (true) {
    const { payload } = yield take(REGISTER_STEP_2_API.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, SIGNUP_STEP_2, payloadApi);
      yield put(REGISTER_STEP_2_API.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error) {
      yield put(REGISTER_STEP_2_API.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchUpdateProfile() {
  while (true) {
    const { payload } = yield take(UPDATE_PROFILE_API.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, UPDATE_PROFILE, payloadApi);
      yield put(UPDATE_PROFILE_API.success({ data: response }));
      cb?.(response);
    } catch (error) {
      yield put(UPDATE_PROFILE_API.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchForgotPassword() {
  while (true) {
    const { payload } = yield take(FORGOT_PASSWORD_API.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_FORGOT_PASSWORD, payloadApi);
      yield put(FORGOT_PASSWORD_API.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error) {
      yield put(FORGOT_PASSWORD_API.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchVerifyCode() {
  while (true) {
    const { payload } = yield take(OTP_VERIFICATION_API.request.type);
    const { payloadApi, cb ,cbErr} = payload;
    try {
      const response = yield call(callRequest, OTP_VERIFICATION, payloadApi);
      yield put(OTP_VERIFICATION_API.success({ data: response?.data }));
      cb?.(response);
    } catch (error) {
      yield put(OTP_VERIFICATION_API.failure({ errorMessage: error.message }));
      cbErr?.(error);
      Util.showMessage(error.message);
    }
  }
}

function* watchVerifyEmail() {
  while (true) {
    const { payload } = yield take(VERIFY_EMAIL_API.request.type);
    const { payloadApi, cb,cbErr } = payload;
    try {
      const response = yield call(callRequest, VERIFY_EMAIL, payloadApi);
      yield put(VERIFY_EMAIL_API.success({ data: response?.data }));
      cb?.(response);
    } catch (error) {
      yield put(VERIFY_EMAIL_API.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
      cbErr?.(error)
    }
  }
}

function* watchChangeEmail() {
  while (true) {
    const { payload } = yield take(CHANGE_EMAIL_API.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, CHANGE_EMAIL, payloadApi);
      yield put(CHANGE_EMAIL_API.success({ data: response?.data }));
      cb?.(response);
    } catch (error) {
      yield put(CHANGE_EMAIL_API.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchLogout() {
  while (true) {
    const { payload } = yield take(LOGOUT_API.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_LOGOUT, payloadApi);
      yield put(LOGOUT_API.success({ data: response?.data }));
      cb?.(response);
    } catch (error) {
      yield put(LOGOUT_API.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchResetPassword() {
  while (true) {
    const { payload } = yield take(RESET_PASSWORD_API.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_RESET_PASSWORD, payloadApi);
      yield put(RESET_PASSWORD_API.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error) {
      yield put(RESET_PASSWORD_API.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchAccpetInv() {
  while (true) {
    const { payload } = yield take(ACCEPT_INVITATIONS_API.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, ACCEPT_INVITATIONS, payloadApi);
      yield put(ACCEPT_INVITATIONS_API.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error) {
      yield put(ACCEPT_INVITATIONS_API.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}
export default function* root() {
  yield fork(watchRegisterPage1);
  yield fork(watchAccpetInv);
  yield fork(watchVerifyEmail);
  yield fork(watchRegisterPage2);
  yield fork(watchResetPassword);
  yield fork(watchLogin);
  yield fork(watchVerifyCode);
  yield fork(watchUpdateProfile);
  yield fork(watchChangeEmail);

  //EXTRA DATA
  yield fork(watchForgotPassword);
  yield fork(watchLogout)
}
