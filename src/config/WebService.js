// BASE URL
// export const BASE_URL = 'https://talentoneed.uatlink.com';
export const BASE_URL = 'https://phplaravel-1466257-5535619.cloudwaysapps.com';
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

export const SIGNUP_STEP_1 = {
  route: `${API}signup/step1`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const SIGNUP_STEP_2 = {
  route: `${API}signup/step2`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const OTP_VERIFICATION = {
  route: `${API}otp-verification`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const VERIFY_EMAIL = {
  route: `${API}verify-email`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_LOGIN = {
  route: `${API}login`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_RESET_PASSWORD = {
  route: `${API}reset-password`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const CHANGE_EMAIL = {
  route: `${API}email/change`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_FORGOT_PASSWORD = {
  route: `${API}forget-password`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_GET_COUNTRIES = {
  route: `${API}get-countries`,
  access_token_required: true,
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

export const WORK_EXPERIENCE = {
  route: `${API}candidate/work-experience`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_WORK_EXPERIENCE = {
  route: `${API}candidate/delete-work-experience`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const EDUCATION = {
  route: `${API}candidate/education`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_EDUCATION = {
  route: `${API}candidate/delete-education`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const PASSPORT_VISA = {
  route: `${API}candidate/passport-visa`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_PASSPORT_VISA = {
  route: `${API}candidate/delete-passport-visa`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const LANGUAGE = {
  route: `${API}candidate/languages`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_LANGUAGE = {
  route: `${API}candidate/delete-languages`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SKILLS = {
  route: `${API}candidate/skills`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_SKILLS = {
  route: `${API}candidate/delete-skills`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const LICENSE = {
  route: `${API}candidate/license-certificate`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_LICENSE = {
  route: `${API}candidate/delete-license-certificate`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const JOBS_TITLE = {
  route: `${API}candidate/preferable-job`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const PREFERABLE_INDUSTRY = {
  route: `${API}candidate/preferable-industry`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const PREFERABLE_LOCATION = {
  route: `${API}candidate/preferable-location`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_NOTES = {
  route: `${API}candidate/get-note`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SAVE_NOTES = {
  route: `${API}candidate/note`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const PROFILE_LOCK = {
  route: `${API}candidate/lock-profile`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_INDUSTRY = {
  route: `${API}get-industries`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_EMPLOYMENT = {
  route: `${API}get-employment-types`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_EXPERIENCE = {
  route: `${API}get-experience-level`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_JOB = {
  route: `${API}get-job-title`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_LANGUAGES = {
  route: `${API}get-languages`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_NOTES = {
  route: `${API}update-note`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_SKILLS = {
  route: `${API}get-skills`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_LICANCE = {
  route: `${API}get-licence`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_CERTIFICATE = {
  route: `${API}get-certificate`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_DEGREE = {
  route: `${API}get-degrees`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

// export const GET_STATE = {
//   route: `${API}get-states`,
//   access_token_required: true,
//   type: REQUEST_TYPE.POST,
// };

export const PROFESSIONAL_PROFILE = {
  route: `${API}candidate/professional-profile`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const BEHIND_UNIFORM = {
  route: `${API}candidate/behind-the-uniform`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const FAVORITE_HOBBY = {
  route: `${API}candidate/favorite-hobby`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_NOTIFICATION = {
  route: `${API}candidate/get-notification`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_PROFILE = {
  route: `${API}candidate/update-profile`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const VIDEO_QUESTION_1 = {
  route: `${API}candidate/upload-media-aspects-of-job`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const VIDEO_QUESTION_2 = {
  route: `${API}candidate/upload-career-achievement-media`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const VIDEO_QUESTION_3 = {
  route: `${API}candidate/upload-hobby-or-interest-media`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const VIDEO_QUESTION_4 = {
  route: `${API}candidate/upload-fun-fact-about-you-media`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_INTERVIEW_JOBS = {
  route: `${API}candidate/get-industries-preference`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPLOAD_RESUME = {
  route: `${API}candidate/upload-resume`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const PROFILE_PERCENTAGE = {
  route: `${API}candidate/user-profile-percentage`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_RESUME = {
  route: `${API}candidate/delete-resume`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CANDIDATE_PROFILE = {
  route: `${API}candidate/profile`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CREATE_CHATROOM = {
  route: `${API}chat-room/create`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_CHATROOM = {
  route: `${API}chat-room/get`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPLOAD_MEDIA = {
  route: `${API}media/upload`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_INVITATIONS = {
  route: `${API}candidate/get-invitations`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const ACCEPT_INVITATIONS = {
  route: `${API}candidate/respond-to-invitation`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SALARY_FREQYENCY = {
  route: `${API}get-salary-frequency`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_PERFERABLE = {
  route: `${API}candidate/preferable-job/delete`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SALARY_CURRENCY = {
  route: `${API}get-salary-currency`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const INTERVIEW_HISTORY = {
  route: `${API}candidate/get-interview-invitation-history`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const INTERVIEW_DECLINE = {
  route: `${API}candidate/reject-invitation`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const INTERVIEW_ACCEPT = {
  route: `${API}candidate/accept-invitation`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_LOGOUT = {
  route: `${API}logout`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const SEND_NOTIFICATION = {
  route: `${API}send-fcm`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const CHANGE_PASSWORD = {
  route: `${API}change-password`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const TERMS_AND_CONDITIONS = {
  route: `${API}terms-and-conditions`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const DELETE_PHOTO_VIDEOS = {
  route: `${API}candidate/user-media/remove`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const PHOTO_LABEL = {
  route: `${API}candidate/photos-label`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const VIDEO_LABEL = {
  route: `${API}candidate/videos-label`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
