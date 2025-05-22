import {channel} from 'redux-saga';
import {take, put, fork, call} from 'redux-saga/effects';

import {
  API_REGISTER,
  API_GET_COUNTRIES,
  API_GET_STATES,
  API_GET_CITY,
  API_VERIFY_OTP,
  API_FORGET_PASSWORD,
  API_RESET_PASSWORD,
  UPLOAD_PROFILE_PICTURE,
  API_LOGIN,
  API_EDIT_PROFILE,
  GET_SUBSCRIPTION_PLANS,
  API_PURCHASE_PLAN,
  API_GET_NOTIFICATIONS,
  API_GET_ALL_CHATS,
  API_TERMS_CONDITION,
  API_PRIVACY_PLICY,
  API_CREATE_CHILDREN_PROFILE,
  API_FAQS,
  API_ABOUT,
  API_SUPPORT_CENTER,
  API_GET_USERS,
  API_FILTERS,
  API_LIKE_DISLIKE,
  API_ADD_CHILDREN_PICTURES,
  API_GET_CHILDREN,
  API_DELETE_CHILDREN,
  API_EDIT_CHILDREN,
  API_MATCHING_PROFILE,
  API_RATING,
  API_CHANGE_PASSWORD,
  API_SOCIAL_AUTHENTICATION,
  API_CREATE_CHAT_ROOM,
} from '../../config/WebService';
import {Util} from '../../utils';
import {callRequest} from '../../utils/ApiSauce';

import {
  authSignUp,
  getCountries,
  getCity,
  getStates,
  authEmailVerification,
  authForgetPassword,
  authResetPassword,
  updateProfilePic,
  authLogin,
  updateUserProfile,
  subscriptionplans,
  purchaseplan,
  getNotification,
  getAllChats,
  getTermsCondition,
  getPrivacyPolicy,
  addchildren,
  getFaqs,
  getAbout,
  getSupportCenter,
  getUsers,
  filters,
  likedislike,
  addchildrenpicture,
  getmychildren,
  deletemychildren,
  editmychildren,
  matchingprofile,
  rating,
  changepassword,
  socailLogin,
  chatroom,
} from './';
import {showMessage} from 'react-native-flash-message';

const uploadImageChannel = channel();

function* watchRegister() {
  while (true) {
    const {payload} = yield take(authSignUp.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_REGISTER, payloadApi);
      yield put(authSignUp.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(authSignUp.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetCountries() {
  while (true) {
    const {payload} = yield take(getCountries.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_GET_COUNTRIES, payloadApi);
      console.log(
        '🚀 ~ file: saga.js:33 ~ function*watchRegister ~ response:',
        response,
      );
      yield put(getCountries.success({data: response?.data}));
      cb(response?.data);
    } catch (error) {
      yield put(getCountries.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetCity() {
  while (true) {
    const {payload} = yield take(getCity.request.type);
    const {payloadApi, cb, headers = {}, parameter} = payload;
    try {
      const response = yield call(
        callRequest,
        API_GET_CITY,
        payloadApi,
        headers,
        parameter,
      );
      yield put(getCity.success({data: response?.data}));
      cb(response?.data);
    } catch (error) {
      yield put(getCity.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchVerifyOtp() {
  while (true) {
    const {payload} = yield take(authEmailVerification.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_VERIFY_OTP, payloadApi);
      yield put(authEmailVerification.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(authEmailVerification.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetStates() {
  while (true) {
    const {payload} = yield take(getStates.request.type);
    const {payloadApi, cb, headers = {}, parameter} = payload;
    try {
      const response = yield call(
        callRequest,
        API_GET_STATES,
        payloadApi,
        headers,
        parameter,
      );
      yield put(getStates.success({data: response?.data}));
      cb(response?.data);
    } catch (error) {
      yield put(getStates.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchForgetPassword() {
  while (true) {
    const {payload} = yield take(authForgetPassword.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_FORGET_PASSWORD, payloadApi);
      yield put(authForgetPassword.success());
      cb?.(response);
    } catch (error) {
      console.log(
        '🚀 ~ file: saga.js:130 ~ function*watchForgetPassword ~ error:',
        error?.message,
      );
      yield put(authForgetPassword.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchResetPassword() {
  while (true) {
    const {payload} = yield take(authResetPassword.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_RESET_PASSWORD, payloadApi);
      yield put(authResetPassword.success({data: response?.data}));
      cb?.(response.data);
    } catch (error) {
      yield put(authResetPassword.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchcreatechildren() {
  while (true) {
    const {payload} = yield take(addchildren.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(
        callRequest,
        API_CREATE_CHILDREN_PROFILE,
        payloadApi,
      );
      yield put(addchildren.success({data: response?.data}));
      Util.showMessage(response?.message, 'success');
      cb?.(response.data);
    } catch (error) {
      yield put(addchildren.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchUpdateProfilePicture() {
  while (true) {
    const {payload} = yield take(updateProfilePic.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(
        callRequest,
        UPLOAD_PROFILE_PICTURE,
        payloadApi,
      );
      yield put(updateProfilePic.success({data: response?.data}));
      cb?.(response.data);
      Util.showMessage('Profile picture updated succesfully', 'success');
    } catch (error) {
      console.log(error, 'error');
      yield put(updateProfilePic.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchSocailLogin() {
  while (true) {
    const {payload} = yield take(socailLogin.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(
        callRequest,
        API_SOCIAL_AUTHENTICATION,
        payloadApi,
      );
      yield put(socailLogin.success({data: response?.data}));
      cb?.({isEmailVerified: true, ...response.data});
    } catch (error) {
      yield put(socailLogin.failure({errorMessage: error.message}));
      console.log(error, 'error');
      if (error.message == 'Please verify your account') {
        cb?.({isEmailVerified: false});
      }
      Util.showMessage(error.message);
    }
  }
}
function* watchLogin() {
  while (true) {
    const {payload} = yield take(authLogin.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_LOGIN, payloadApi);
      yield put(authLogin.success({data: response?.data}));
      cb?.({isEmailVerified: true, ...response.data});
    } catch (error) {
      yield put(authLogin.failure({errorMessage: error.message}));
      console.log(error, 'error');
      if (error.message == 'Please verify your account') {
        cb?.({isEmailVerified: false});
      }
      Util.showMessage(error.message);
    }
  }
}

function* watchUpdateUserProfile() {
  while (true) {
    const {payload} = yield take(updateUserProfile.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_EDIT_PROFILE, payloadApi);
      yield put(updateUserProfile.success({data: response?.data}));
      cb?.(response.data);
      Util.showMessage('Profile updated succesfully', 'success');
    } catch (error) {
      yield put(updateUserProfile.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}
function* watchpurchaseplan() {
  while (true) {
    const {payload} = yield take(purchaseplan.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_PURCHASE_PLAN, payloadApi);
      yield put(purchaseplan.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(purchaseplan.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchlikedislike() {
  while (true) {
    const {payload} = yield take(likedislike.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_LIKE_DISLIKE, payloadApi);
      console.log(
        '🚀 ~ file: saga.js:294 ~ function*watchlikedislike ~ response:',
        response?.message,
      );
      yield put(likedislike.success({data: response?.purchased_plan}));
      cb?.(response.purchased_plan);
      Util.showMessage(response.message, 'success');
    } catch (error) {
      yield put(likedislike.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}
function* watchfilters() {
  while (true) {
    const {payload} = yield take(filters.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_FILTERS, payloadApi);
      yield put(filters.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(filters.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}
function* watchgetplans() {
  while (true) {
    const {payload} = yield take(subscriptionplans.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(
        callRequest,
        GET_SUBSCRIPTION_PLANS,
        payloadApi,
      );
      yield put(subscriptionplans.success({data: response?.data}));
      cb?.(response.data);
    } catch (error) {
      yield put(subscriptionplans.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchChangePassword() {
  while (true) {
    const {payload} = yield take(changepassword.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_CHANGE_PASSWORD, payloadApi);
      yield put(changepassword.success({data: response?.data}));
      cb?.(response.data);
      Util.showMessage(response?.message, 'success');
    } catch (error) {
      yield put(changepassword.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchgetNotification() {
  while (true) {
    const {payload} = yield take(getNotification.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(
        callRequest,
        API_GET_NOTIFICATIONS,
        payloadApi,
      );
      yield put(getNotification.success({data: response?.data}));
    } catch (error) {
      yield put(getNotification.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetAllChats() {
  while (true) {
    const {payload} = yield take(getAllChats.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_GET_ALL_CHATS, payloadApi);
      yield put(getAllChats.success({data: response?.data?.rooms}));
      cb(response.data);
    } catch (error) {
      yield put(getAllChats.failure({errorMessage: error.message}));

      Util.showMessage(error.message);
    }
  }
}

function* watchGetTermsandCondition() {
  while (true) {
    const {payload} = yield take(getTermsCondition.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_TERMS_CONDITION, payloadApi);
      yield put(getTermsCondition.success({data: response?.data}));
      cb(response.data);
    } catch (error) {
      yield put(getTermsCondition.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetPrivacyPolicy() {
  while (true) {
    const {payload} = yield take(getPrivacyPolicy.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_PRIVACY_PLICY, payloadApi);
      yield put(getPrivacyPolicy.success({data: response?.data}));
      cb(response.data);
    } catch (error) {
      yield put(getPrivacyPolicy.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetfaqs() {
  while (true) {
    const {payload} = yield take(getFaqs.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_FAQS, payloadApi);
      yield put(getFaqs.success({data: response?.data}));
      cb(response?.data);
    } catch (error) {
      yield put(getFaqs.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetuser() {
  while (true) {
    const {payload} = yield take(getUsers.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_GET_USERS, payloadApi);
      cb(response?.data?.users);
      yield put(getUsers.success({data: response?.data?.users}));
    } catch (error) {
      yield put(getUsers.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetabout() {
  while (true) {
    const {payload} = yield take(getAbout.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_ABOUT, payloadApi);
      yield put(getAbout.success({data: response?.data}));
      cb(response.data);
    } catch (error) {
      yield put(getAbout.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetsupport() {
  while (true) {
    const {payload} = yield take(getSupportCenter.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_SUPPORT_CENTER, payloadApi);
      yield put(getSupportCenter.success({data: response?.data}));
      cb(response.data);
    } catch (error) {
      yield put(getSupportCenter.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}
function* watchAddChildrenPicture() {
  while (true) {
    const {payload} = yield take(addchildrenpicture.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(
        callRequest,
        API_ADD_CHILDREN_PICTURES,
        payloadApi,
      );
      yield put(addchildrenpicture.success({data: response?.data}));
      Util.showMessage(response.message, 'success');
      cb(response.data);
    } catch (error) {
      yield put(addchildrenpicture.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}
function* watchGetChildren() {
  while (true) {
    const {payload} = yield take(getmychildren.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_GET_CHILDREN, payloadApi);
      yield put(getmychildren.success({data: response?.data}));
      cb(response.data);
    } catch (error) {
      yield put(getmychildren.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchMatchingProfile() {
  while (true) {
    const {payload} = yield take(matchingprofile.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(
        callRequest,
        API_MATCHING_PROFILE,
        payloadApi,
      );
      yield put(matchingprofile.success({data: response?.matches}));
      cb(response.matches);
    } catch (error) {
      yield put(matchingprofile.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchDeleteChildren() {
  while (true) {
    const {payload} = yield take(deletemychildren.request.type);
    const {payloadApi, cb, headers = {}, parameter} = payload;
    try {
      const response = yield call(
        callRequest,
        API_DELETE_CHILDREN,
        payloadApi,
        headers,
        parameter,
      );
      yield put(deletemychildren.success({data: response?.data}));
      Util.showMessage(response?.message, 'success');
      cb(response?.data);
    } catch (error) {
      yield put(deletemychildren.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}
function* watchEditChildren() {
  while (true) {
    const {payload} = yield take(editmychildren.request.type);
    const {payloadApi, cb, headers = {}, parameter} = payload;
    try {
      const response = yield call(
        callRequest,
        API_EDIT_CHILDREN,
        payloadApi,
        headers,
        parameter,
      );
      yield put(editmychildren.success({data: response?.data}));
      Util.showMessage(response?.message, 'success');
      cb(response?.data);
    } catch (error) {
      yield put(editmychildren.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}
function* watchCreateChatRoom() {
  while (true) {
    const {payload} = yield take(chatroom.request.type);
    const {payloadApi, cb, headers = {}} = payload;
    try {
      const response = yield call(
        callRequest,
        API_CREATE_CHAT_ROOM,
        payloadApi,
        headers,
      );
      yield put(chatroom.success({data: response?.data}));
      cb(response?.data);
    } catch (error) {
      yield put(chatroom.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}
function* watchRating() {
  while (true) {
    const {payload} = yield take(rating.request.type);
    const {payloadApi, cb, headers = {}} = payload;
    try {
      const response = yield call(callRequest, API_RATING, payloadApi, headers);
      yield put(rating.success({data: response?.data}));
      Util.showMessage(response?.message, 'success');
      cb(response?.data);
    } catch (error) {
      yield put(rating.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

export default function* root() {
  yield fork(watchRegister);
  yield fork(watchGetCountries);
  yield fork(watchGetStates);
  yield fork(watchGetCity);
  yield fork(watchVerifyOtp);
  yield fork(watchForgetPassword);
  yield fork(watchResetPassword);
  yield fork(watchUpdateProfilePicture);
  yield fork(watchLogin);
  yield fork(watchUpdateUserProfile);
  yield fork(watchgetplans);
  yield fork(watchpurchaseplan);
  yield fork(watchgetNotification);
  yield fork(watchGetAllChats);
  yield fork(watchGetTermsandCondition);
  yield fork(watchGetPrivacyPolicy);
  yield fork(watchcreatechildren);
  yield fork(watchGetfaqs);
  yield fork(watchGetabout);
  yield fork(watchGetuser);
  yield fork(watchGetsupport);
  yield fork(watchfilters);
  yield fork(watchlikedislike);
  yield fork(watchAddChildrenPicture);
  yield fork(watchGetChildren);
  yield fork(watchDeleteChildren);
  yield fork(watchEditChildren);
  yield fork(watchRating);
  yield fork(watchMatchingProfile);
  yield fork(watchSocailLogin);
  yield fork(watchChangePassword);
  yield fork(watchCreateChatRoom);
}
