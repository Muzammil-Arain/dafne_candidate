// BASE URL
export const BASE_URL = 'https://playdate.goliveapps.com';
export const X_API_TOKEN = 'X-Access-Token';

// REQUEST TYPES
export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
  PATCH: 'patch',
};

// CONSTANTS
export const LIMIT = 20;
export const API_TIMEOUT = 30000;
export const API = '/api/';
export const API_LOG = true;

// API'S
export const API_TEST_LISTING = {
  route: `${API}post`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const API_UPLOAD_FILE = {
  route: `${API}upload-file`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_REGISTER = {
  route: `${API}register`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_GET_COUNTRIES = {
  route: `${API}get-countries`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_GET_STATES = {
  route: `${API}get-states`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_GET_CITY = {
  route: `${API}get-cities`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_VERIFY_OTP = {
  route: `${API}verify-otp`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_FORGET_PASSWORD = {
  route: `${API}forgot-password`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_RESET_PASSWORD = {
  route: `${API}reset-password`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const UPLOAD_PROFILE_PICTURE = {
  route: `${API}edit-profile/upload-picture`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_LOGIN = {
  route: `${API}login`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_LOGOUT = {
  route: `${API}logout`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_EDIT_PROFILE = {
  route: `${API}edit-profile`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_SUBSCRIPTION_PLANS = {
  route: `${API}get-plans`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_PURCHASE_PLAN = {
  route: `${API}purchase-plan`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_NOTIFICATIONS = {
  route: `${API}notifications`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_ALL_CHATS = {
  route: `${API}get-all-chats-rooms`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_TERMS_CONDITION = {
  route: `${API}terms-and-condition`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_PRIVACY_PLICY = {
  route: `${API}privacy-policy`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_ABOUT = {
  route: `${API}about-program`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_SUPPORT_CENTER = {
  route: `${API}support-center`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_FAQS = {
  route: `${API}faq`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_CREATE_CHILDREN_PROFILE = {
  route: `${API}children`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_GET_USERS = {
  route: `${API}users`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_FILTERS = {
  route: `${API}filters`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_LIKE_DISLIKE = {
  route: `${API}children/like-dislike`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_ADD_CHILDREN = {
  route: `${API}children`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_ADD_CHILDREN_PICTURES = {
  route: `${API}children/pictures`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_GET_CHILDREN = {
  route: `${API}my-children`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_DELETE_CHILDREN = {
  route: `${API}child/delete`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const API_EDIT_CHILDREN = {
  route: `${API}children/edit`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_MATCHING_PROFILE = {
  route: `${API}matching-profiles`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_RATING = {
  route: `${API}rate`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_CHANGE_PASSWORD = {
  route: `${API}change-password`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_SOCIAL_AUTHENTICATION = {
  route: `${API}social-authentication`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_CREATE_CHAT_ROOM = {
  route: `${API}create-chat-room`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
