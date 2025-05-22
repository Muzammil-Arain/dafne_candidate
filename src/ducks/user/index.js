import {makeAction, makeRequesActions} from '../ActionTypes';
import {createReducer} from '@reduxjs/toolkit';

// action creators
// AUTH APIS
export const authSignUp = makeRequesActions('AUTH_SIGNUP');
export const getCountries = makeRequesActions('API_GET_COUNTRIES');
export const getStates = makeRequesActions('API_GET_STATES');
export const getCity = makeRequesActions('API_GET_CITY');
export const authEmailVerification = makeRequesActions('API_VERIFY_OTP');
export const authForgetPassword = makeRequesActions('API_FORGET_PASSWORD');
export const authResetPassword = makeRequesActions('API_RESET_PASSWORD');
export const updateProfilePic = makeRequesActions('UPLOAD_PROFILE_PICTURE');
export const authLogin = makeRequesActions('AUTH_LOGIN');
export const authUserLogout = makeRequesActions('LOGOUT');
export const subscriptionplans = makeRequesActions('GET_SUBSCRIPTION_PLANS');
export const purchaseplan = makeRequesActions('API_PURCHASE_PLAN');
export const getNotification = makeRequesActions('GET_NOTIFICATION');
export const getAllChats = makeRequesActions('API_GET_ALL_CHATS');
export const getTermsCondition = makeRequesActions('API_TERMS_CONDITION');
export const getPrivacyPolicy = makeRequesActions('GET_PRIVACY_POLICY');
export const getAbout = makeRequesActions('API_ABOUT');
export const getSupportCenter = makeRequesActions('API_SUPPORT_CENTER');
export const getFaqs = makeRequesActions('API_FAQS');
export const getUsers = makeRequesActions('API_GET_USERS');
export const updateUserProfile = makeRequesActions('API_EDIT_PROFILE');
export const addchildren = makeRequesActions('API_ADD_CHILDREN');
export const addchildrenpicture = makeRequesActions(
  'API_ADD_CHILDREN_PICTURES',
);
export const filters = makeRequesActions('API_FILTERS');
export const matchingprofile = makeRequesActions('API_MATCHING_PROFILE');
export const likedislike = makeRequesActions('API_LIKE_DISLIKE');
export const getmychildren = makeRequesActions('API_GET_CHILDREN');
export const deletemychildren = makeRequesActions('API_DELETE_CHILDREN');
export const editmychildren = makeRequesActions('API_EDIT_CHILDREN');
export const rating = makeRequesActions('API_RATING');
export const changepassword = makeRequesActions('API_CHANGE_PASSWORD');
export const socailLogin = makeRequesActions('API_SOCIAL_AUTHENTICATION');
export const chatroom = makeRequesActions('API_CREATE_CHAT_ROOM');

// init state
const initalState = {
  homeData: [],
  data: {},
  countries: [],
  subscriptionplan: [],
  notification: [],
  allchats: [],
  childrenData: [],
};

// init reducer
export default createReducer(initalState, builder => {
  builder.addCase(authSignUp.success, (state, action) => {
    const {data} = action.payload;
    state.data = data;
  });
  builder.addCase(getNotification.success, (state, action) => {
    const {data} = action.payload;
    state.notification = data;
  });
  builder.addCase(getCountries.success, (state, action) => {
    const {data} = action.payload;
  });
  builder.addCase(getStates.success, (state, action) => {
    const {data} = action.payload;
  });
  builder.addCase(authEmailVerification.success, (state, action) => {
    const {data} = action.payload;
    state.data = data;
  });
  builder.addCase(authForgetPassword, (state, action) => {
    state.data = {};
  });
  builder.addCase(addchildren, (state, action) => {
    state.data = {};
  });
  builder.addCase(addchildrenpicture, (state, action) => {
    state.data = {};
  });
  builder.addCase(changepassword, (state, action) => {
    state.data = {};
  });
  builder.addCase(subscriptionplans, (state, action) => {
    state.data = {};
  });
  builder.addCase(likedislike, (state, action) => {
    state.data = {};
  });
  builder.addCase(getmychildren, (state, action) => {
    const {data} = action.payload;
    state.childrenData = data;
  });
  builder.addCase(deletemychildren, (state, action) => {
    state.data = {};
  });
  builder.addCase(matchingprofile, (state, action) => {
    state.data = {};
  });
  builder.addCase(rating, (state, action) => {
    state.data = {};
  });
  builder.addCase(editmychildren, (state, action) => {
    state.data = {};
  });
  builder.addCase(filters, (state, action) => {
    state.data = {};
  });
  builder.addCase(authResetPassword, (state, action) => {
    state.data = {};
  });
  builder.addCase(updateProfilePic.success, (state, action) => {
    const {data} = action.payload;
    let {profile_picture} = data;
    state.data.user = {...state.data.user, profile_picture};
  });
  builder.addCase(authLogin.success, (state, action) => {
    const {data} = action.payload;
    (state.subscriptionplan = data?.user?.purchased_plan), (state.data = data);
  });
  builder.addCase(socailLogin.success, (state, action) => {
    const {data} = action.payload;
    (state.subscriptionplan = data?.user?.purchased_plan), (state.data = data);
  });
  builder.addCase(authUserLogout.success, (state, action) => {});
  builder.addCase(updateUserProfile.success, (state, action) => {
    const {data} = action.payload;
    let {user} = data;
    state.data.user = user;
  });
  builder.addCase(purchaseplan.success, (state, action) => {
    const {data} = action.payload;
    state.subscriptionplan = data;
  });
  builder.addCase(getAllChats.success, (state, action) => {
    const {data} = action.payload;
    state.allchats = data;
  });
  builder.addCase(getTermsCondition, (state, action) => {
    state.data = {};
  });
  builder.addCase(getPrivacyPolicy, (state, action) => {
    state.data = {};
  });
  builder.addCase(getAbout, (state, action) => {
    state.data = {};
  });
  builder.addCase(getFaqs, (state, action) => {
    state.data = {};
  });
  builder.addCase(getSupportCenter, (state, action) => {
    state.data = {};
  });
  builder.addCase(getUsers.success, (state, action) => {
    const {data} = action.payload;
    state.homeData = data;
  });
});

// // selectors
export const getChats = state => state?.user?.allchats;
// export const getUserData = state => state;
export const getHomeData = state => state?.user?.homeData;
export const getUserData = state => state?.user?.data?.user;
export const getCountriesData = state => state?.user?.countries;
export const getUserToken = state => state?.user?.data?.access_token;
export const getNotificationsData = state => state?.user?.notification;
export const getuserSubscriptionData = state => state?.user?.subscriptionplan;
