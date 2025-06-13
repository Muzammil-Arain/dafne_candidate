import {channel} from 'redux-saga';
import {take, put, fork, call} from 'redux-saga/effects';

import {callRequest} from '../../utils/ApiSauce';
import {Util} from '../../utils';

import {
  EDUCATION_API,
  GET_EMPLOYMENT_API,
  GET_COUNTRIES_API,
  GET_INDUSTRY_API,
  GET_JOB_API,
  GET_NOTES_API,
  JOB_TITLE_API,
  LANGUAGE_API,
  LICENSE_API,
  PASSPORT_VISA_API,
  PREFERABLE_INDUSTRY_API,
  PREFERABLE_LOCATION_API,
  PROFILE_LOCK_API,
  SAVE_NOTES_API,
  SKILLS_API,
  WORK_EXPERIENCE_API,
  GET_EXPERIENCE_API,
  GET_LANGUAGES_API,
  GET_SKILLS_API,
  GET_LICANCE_API,
  GET_CERTIFICATE_API,
  UPDATE_NOTES_API,
  GET_DEGREE_API,
  GET_STATE_API,
  PROFESSIONAL_PROFILE_API,
  BEHIND_UNIFORM_API,
  FAVORITE_HOBBY_API,
  GET_NOTIFICATION_API,
  UPDATE_PROFILE_API,
  VIDEO_QUESTION_1_API,
  VIDEO_QUESTION_2_API,
  VIDEO_QUESTION_3_API,
  VIDEO_QUESTION_4_API,
  UPLOAD_RESUME_API,
  PROFILE_PERCENTAGE_API,
  GET_INTERVIEW_JOBS_API,
  DELETE_RESUME_API,
  CANDIDATE_PROFILE_API,
  CREATE_CHATROOM_API,
  UPLOAD_MEDIA_API,
  GET_CHATROOM_API,
  GET_INVITATIONS_API,
  SALARY_FREQYENCYS_API,
  SALARY_CURRENCY_API,
  INTERVIEW_DECLINE_API,
  INTERVIEW_HISTORY_API,
  INTERVIEW_ACCEPT_API,
  SEND_NOTIFICATION_API,
  DELETE_WORK_EXPERIENCE_API,
  DELETE_EDUCATION_API,
  DELETE_PASSPORT_VISA_API,
  DELETE_LANGUAGE_API,
  DELETE_SKILLS_API,
  DELETE_LICENSE_API,
  DELETE_PERFERABLE_API,
  CHANGE_PASSWORD_API,
  DELETE_PHOTO_VIDEOS_API,
  TERMS_AND_CONDITIONS_API,
  API_GET_CITY_API,
  PHOTO_LABEL_API,
  VIDEO_LABEL_API,
} from '.';
import {
  API_GET_CITY,
  API_GET_COUNTRIES,
  API_GET_STATES,
  BEHIND_UNIFORM,
  CANDIDATE_PROFILE,
  CHANGE_PASSWORD,
  CREATE_CHATROOM,
  DELETE_EDUCATION,
  DELETE_LANGUAGE,
  DELETE_LICENSE,
  DELETE_PASSPORT_VISA,
  DELETE_PERFERABLE,
  DELETE_PHOTO_VIDEOS,
  DELETE_RESUME,
  DELETE_SKILLS,
  DELETE_WORK_EXPERIENCE,
  EDUCATION,
  FAVORITE_HOBBY,
  GET_CERTIFICATE,
  GET_CHATROOM,
  GET_DEGREE,
  GET_EMPLOYMENT,
  GET_EXPERIENCE,
  GET_INDUSTRY,
  GET_INTERVIEW_JOBS,
  GET_INVITATIONS,
  GET_JOB,
  GET_LANGUAGES,
  GET_LICANCE,
  GET_NOTES,
  GET_NOTIFICATION,
  GET_SKILLS,
  GET_STATE,
  INTERVIEW_ACCEPT,
  INTERVIEW_DECLINE,
  INTERVIEW_HISTORY,
  JOBS_TITLE,
  LANGUAGE,
  LICENSE,
  PASSPORT_VISA,
  PHOTO_LABEL,
  PREFERABLE_INDUSTRY,
  PREFERABLE_LOCATION,
  PROFESSIONAL_PROFILE,
  PROFILE_LOCK,
  PROFILE_PERCENTAGE,
  SALARY_CURRENCY,
  SALARY_FREQYENCY,
  SAVE_NOTES,
  SEND_NOTIFICATION,
  SKILLS,
  TERMS_AND_CONDITIONS,
  UPDATE_NOTES,
  UPDATE_PROFILE,
  UPLOAD_MEDIA,
  UPLOAD_RESUME,
  VIDEO_LABEL,
  VIDEO_QUESTION_1,
  VIDEO_QUESTION_2,
  VIDEO_QUESTION_3,
  VIDEO_QUESTION_4,
  WORK_EXPERIENCE,
} from '../../config/WebService';

const uploadImageChannel = channel();

function* watchWorkExperience() {
  while (true) {
    const {payload} = yield take(WORK_EXPERIENCE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, WORK_EXPERIENCE, payloadApi);
      yield put(WORK_EXPERIENCE_API.success({data: response?.data}));
      console.log('====================================');
      console.log(response, 'responseresponse');
      console.log('====================================');
      cb?.(response);
    } catch (error) {
      yield put(WORK_EXPERIENCE_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchEducation() {
  while (true) {
    const {payload} = yield take(EDUCATION_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, EDUCATION, payloadApi);
      yield put(EDUCATION_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(EDUCATION_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchPassportVisa() {
  while (true) {
    const {payload} = yield take(PASSPORT_VISA_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, PASSPORT_VISA, payloadApi);
      yield put(PASSPORT_VISA_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(PASSPORT_VISA_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchlanguage() {
  while (true) {
    const {payload} = yield take(LANGUAGE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, LANGUAGE, payloadApi);
      yield put(LANGUAGE_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(LANGUAGE_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchskill() {
  while (true) {
    const {payload} = yield take(SKILLS_API.request.type);
    const {payloadApi, cb,ebErr} = payload;
    try {
      const response = yield call(callRequest, SKILLS, payloadApi);
      yield put(SKILLS_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(SKILLS_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
      ebErr?.(error)
    }
  }
}

function* watchInterviewAccept() {
  while (true) {
    const {payload} = yield take(INTERVIEW_ACCEPT_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, INTERVIEW_ACCEPT, payloadApi);
      yield put(INTERVIEW_ACCEPT_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(INTERVIEW_ACCEPT_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}
function* watchDeleteResume() {
  while (true) {
    const {payload} = yield take(DELETE_RESUME_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, DELETE_RESUME, payloadApi);
      yield put(DELETE_RESUME_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(DELETE_RESUME_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchLicense() {
  while (true) {
    const {payload} = yield take(LICENSE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, LICENSE, payloadApi);
      yield put(LICENSE_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(LICENSE_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchSalaryFrequency() {
  while (true) {
    const {payload} = yield take(SALARY_FREQYENCYS_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, SALARY_FREQYENCY, payloadApi);
      yield put(SALARY_FREQYENCYS_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(SALARY_FREQYENCYS_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchSalarycurrerency() {
  while (true) {
    const {payload} = yield take(SALARY_CURRENCY_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, SALARY_CURRENCY, payloadApi);
      yield put(SALARY_CURRENCY_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(SALARY_CURRENCY_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchPictureQustionOne() {
  while (true) {
    const {payload} = yield take(PROFESSIONAL_PROFILE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(
        callRequest,
        PROFESSIONAL_PROFILE,
        payloadApi,
      );
      yield put(PROFESSIONAL_PROFILE_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(
        PROFESSIONAL_PROFILE_API.failure({errorMessage: error.message}),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchPictureQustionTwo() {
  while (true) {
    const {payload} = yield take(BEHIND_UNIFORM_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, BEHIND_UNIFORM, payloadApi);
      yield put(BEHIND_UNIFORM_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(BEHIND_UNIFORM_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchPictureQustionThree() {
  while (true) {
    const {payload} = yield take(FAVORITE_HOBBY_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, FAVORITE_HOBBY, payloadApi);
      yield put(FAVORITE_HOBBY_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(FAVORITE_HOBBY_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchjobTitle() {
  while (true) {
    const {payload} = yield take(JOB_TITLE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, JOBS_TITLE, payloadApi);
      yield put(JOB_TITLE_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(JOB_TITLE_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchPreferableIndustry() {
  while (true) {
    const {payload} = yield take(PREFERABLE_INDUSTRY_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, PREFERABLE_INDUSTRY, payloadApi);
      yield put(PREFERABLE_INDUSTRY_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(PREFERABLE_INDUSTRY_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchPreferablelocation() {
  while (true) {
    const {payload} = yield take(PREFERABLE_LOCATION_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, PREFERABLE_LOCATION, payloadApi);
      yield put(PREFERABLE_LOCATION_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(PREFERABLE_LOCATION_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchsaveNotes() {
  while (true) {
    const {payload} = yield take(SAVE_NOTES_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, SAVE_NOTES, payloadApi);
      yield put(SAVE_NOTES_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(SAVE_NOTES_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetNotes() {
  while (true) {
    const {payload} = yield take(GET_NOTES_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_NOTES, payloadApi);
      yield put(GET_NOTES_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(GET_NOTES_API.failure({errorMessage: error.message}));
      // Util.showMessage(error.message);
    }
  }
}

function* watchUpdateNotes() {
  while (true) {
    const {payload} = yield take(UPDATE_NOTES_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, UPDATE_NOTES, payloadApi);
      yield put(UPDATE_NOTES_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(UPDATE_NOTES_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchProfileLocker() {
  while (true) {
    const {payload} = yield take(PROFILE_LOCK_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, PROFILE_LOCK, payloadApi);
      yield put(PROFILE_LOCK_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(PROFILE_LOCK_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetIntustry() {
  while (true) {
    const {payload} = yield take(GET_INDUSTRY_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_INDUSTRY, payloadApi);
      yield put(GET_INDUSTRY_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(GET_INDUSTRY_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetEmpolyment() {
  while (true) {
    const {payload} = yield take(GET_EMPLOYMENT_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_EMPLOYMENT, payloadApi);
      yield put(GET_EMPLOYMENT_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(GET_EMPLOYMENT_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetJob() {
  while (true) {
    const {payload} = yield take(GET_JOB_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_JOB, payloadApi);
      yield put(GET_JOB_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(GET_JOB_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetCountry() {
  while (true) {
    const {payload} = yield take(GET_COUNTRIES_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, API_GET_COUNTRIES, payloadApi);
      yield put(GET_COUNTRIES_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(GET_COUNTRIES_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetExperience() {
  while (true) {
    const {payload} = yield take(GET_EXPERIENCE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_EXPERIENCE, payloadApi);
      console.log('🚀 ~ function*watchGetExperience ~ response:', response);
      yield put(GET_EXPERIENCE_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(GET_EXPERIENCE_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}
function* watchGetSkills() {
  while (true) {
    const {payload} = yield take(GET_SKILLS_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_SKILLS, payloadApi);
      yield put(GET_SKILLS_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(GET_SKILLS_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

// function* watchUpdateProfile() {
//   while (true) {
//     const { payload } = yield take(UPDATE_PROFILE_API.request.type);
//     const { payloadApi, cb } = payload;
//     try {
//       const response = yield call(callRequest, UPDATE_PROFILE, payloadApi);
//       yield put(UPDATE_PROFILE_API.success({ data: response?.data }));
//       cb?.(response);
//     } catch (error) {
//       yield put(UPDATE_PROFILE_API.failure({ errorMessage: error.message }));
//       Util.showMessage(error.message);
//     }
//   }
// }

function* watchGetLicance() {
  while (true) {
    const {payload} = yield take(GET_LICANCE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_LICANCE, payloadApi);
      yield put(GET_LICANCE_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(GET_LICANCE_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetCertificate() {
  while (true) {
    const {payload} = yield take(GET_CERTIFICATE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_CERTIFICATE, payloadApi);
      yield put(GET_CERTIFICATE_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(GET_CERTIFICATE_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetDegree() {
  while (true) {
    const {payload} = yield take(GET_DEGREE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_DEGREE, payloadApi);
      yield put(GET_DEGREE_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(GET_DEGREE_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetState() {
  while (true) {
    const {payload} = yield take(GET_STATE_API.request.type);
    const {payloadApi, cb, params, headers} = payload;
    try {
      const response = yield call(
        callRequest,
        API_GET_STATES,
        payloadApi,
        {},
        params,
      );
      yield put(GET_STATE_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(GET_STATE_API.failure({errorMessage: error.message}));
    }
  }
}

function* watchGetCity() {
  while (true) {
    const {payload} = yield take(API_GET_CITY_API.request.type);
    const {payloadApi, cb, params, headers} = payload;
    try {
      const response = yield call(
        callRequest,
        API_GET_CITY,
        payloadApi,
        {},
        params,
      );
      yield put(API_GET_CITY_API.success({data: response?.data}));
      cb?.(response?.data);
    } catch (error) {
      yield put(API_GET_CITY_API.failure({errorMessage: error.message}));
    }
  }
}

function* watchGetNotification() {
  while (true) {
    const {payload} = yield take(GET_NOTIFICATION_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_NOTIFICATION, payloadApi);
      yield put(GET_NOTIFICATION_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(GET_NOTIFICATION_API.failure({errorMessage: error.message}));
      // Util.showMessage(error.message);
    }
  }
}

function* watchGetLanguages() {
  while (true) {
    const {payload} = yield take(GET_LANGUAGES_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_LANGUAGES, payloadApi);
      yield put(GET_LANGUAGES_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(GET_LANGUAGES_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchPostQuestion1() {
  while (true) {
    const {payload} = yield take(VIDEO_QUESTION_1_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, VIDEO_QUESTION_1, payloadApi);
      yield put(VIDEO_QUESTION_1_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(VIDEO_QUESTION_1_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchPostQuestion2() {
  while (true) {
    const {payload} = yield take(VIDEO_QUESTION_2_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, VIDEO_QUESTION_2, payloadApi);
      yield put(VIDEO_QUESTION_2_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(VIDEO_QUESTION_2_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchPostQuestion3() {
  while (true) {
    const {payload} = yield take(VIDEO_QUESTION_3_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, VIDEO_QUESTION_3, payloadApi);
      yield put(VIDEO_QUESTION_3_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(VIDEO_QUESTION_3_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchPostQuestion4() {
  while (true) {
    const {payload} = yield take(VIDEO_QUESTION_4_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, VIDEO_QUESTION_4, payloadApi);
      yield put(VIDEO_QUESTION_4_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(VIDEO_QUESTION_4_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchPgetjobs() {
  while (true) {
    const {payload} = yield take(GET_JOB_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_JOB, payloadApi);
      yield put(GET_JOB_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(GET_JOB_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchchangePassword() {
  while (true) {
    const {payload} = yield take(CHANGE_PASSWORD_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, CHANGE_PASSWORD, payloadApi);
      yield put(CHANGE_PASSWORD_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(CHANGE_PASSWORD_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchinterViewJobs() {
  while (true) {
    const {payload} = yield take(GET_INTERVIEW_JOBS_API.request.type);
    const {payloadApi, cb, params, header = {}} = payload;
    try {
      const response = yield call(
        callRequest,
        GET_INTERVIEW_JOBS,
        payloadApi,
        header,
        params,
      );
      yield put(GET_INTERVIEW_JOBS_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(GET_INTERVIEW_JOBS_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchDeleteJobs() {
  while (true) {
    const {payload} = yield take(DELETE_PERFERABLE_API.request.type);
    const {payloadApi, cb, params, header = {}} = payload;
    try {
      const response = yield call(
        callRequest,
        DELETE_PERFERABLE,
        payloadApi,
        header,
        params,
      );
      yield put(DELETE_PERFERABLE_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(DELETE_PERFERABLE_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchUploadResume() {
  while (true) {
    const {payload} = yield take(UPLOAD_RESUME_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, UPLOAD_RESUME, payloadApi);
      yield put(UPLOAD_RESUME_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(UPLOAD_RESUME_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchProfilePercentage() {
  while (true) {
    const {payload} = yield take(PROFILE_PERCENTAGE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, PROFILE_PERCENTAGE, payloadApi);
      yield put(PROFILE_PERCENTAGE_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(PROFILE_PERCENTAGE_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetprofile() {
  while (true) {
    const {payload} = yield take(CANDIDATE_PROFILE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, CANDIDATE_PROFILE, payloadApi);
      yield put(CANDIDATE_PROFILE_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(CANDIDATE_PROFILE_API.failure({errorMessage: error.message}));
      // Util.showMessage(error.message);
    }
  }
}

function* watchCreateChatRoom() {
  while (true) {
    const {payload} = yield take(CREATE_CHATROOM_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, CREATE_CHATROOM, payloadApi);
      yield put(CREATE_CHATROOM_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(CREATE_CHATROOM_API.failure({errorMessage: error.message}));
      // Util.showMessage(error.message);
    }
  }
}

function* watchGetChatRoom() {
  while (true) {
    const {payload} = yield take(GET_CHATROOM_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_CHATROOM, payloadApi);
      yield put(GET_CHATROOM_API.success({data: response?.data}));
      cb?.(response);
    } catch (error) {
      yield put(GET_CHATROOM_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchUploadmedia() {
  while (true) {
    const {payload} = yield take(UPLOAD_MEDIA_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, UPLOAD_MEDIA, payloadApi);
      yield put(UPLOAD_MEDIA_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(UPLOAD_MEDIA_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetInvitation() {
  while (true) {
    const {payload} = yield take(GET_INVITATIONS_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, GET_INVITATIONS, payloadApi);
      yield put(GET_INVITATIONS_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(GET_INVITATIONS_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchdDeclineInvitation() {
  while (true) {
    const {payload} = yield take(INTERVIEW_DECLINE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, INTERVIEW_DECLINE, payloadApi);
      yield put(INTERVIEW_DECLINE_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(INTERVIEW_DECLINE_API.failure({errorMessage: error.message}));
      Util.showMessage(error.message);
    }
  }
}

function* watchdHistoryInvitation() {
  while (true) {
    const {payload} = yield take(INTERVIEW_HISTORY_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, INTERVIEW_HISTORY, payloadApi);
      yield put(INTERVIEW_HISTORY_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(INTERVIEW_HISTORY_API.failure({errorMessage: error.message}));
      // Util.showMessage(error.message);
    }
  }
}

function* watchdsendNotification() {
  while (true) {
    const {payload} = yield take(SEND_NOTIFICATION_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, SEND_NOTIFICATION, payloadApi);
      yield put(SEND_NOTIFICATION_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(SEND_NOTIFICATION_API.failure({errorMessage: error.message}));
      // Util.showMessage(error.message);
    }
  }
}

function* watchddeleteWorkExperience() {
  while (true) {
    const {payload} = yield take(DELETE_WORK_EXPERIENCE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(
        callRequest,
        DELETE_WORK_EXPERIENCE,
        payloadApi,
      );
      yield put(DELETE_WORK_EXPERIENCE_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(
        DELETE_WORK_EXPERIENCE_API.failure({errorMessage: error.message}),
      );
    }
  }
}

function* watchddeleteEducation() {
  while (true) {
    const {payload} = yield take(DELETE_EDUCATION_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, DELETE_EDUCATION, payloadApi);
      yield put(DELETE_EDUCATION_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(DELETE_EDUCATION_API.failure({errorMessage: error.message}));
    }
  }
}

function* watchddeleteVisaPassport() {
  while (true) {
    const {payload} = yield take(DELETE_PASSPORT_VISA_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(
        callRequest,
        DELETE_PASSPORT_VISA,
        payloadApi,
      );
      yield put(DELETE_PASSPORT_VISA_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(
        DELETE_PASSPORT_VISA_API.failure({errorMessage: error.message}),
      );
    }
  }
}

function* watchdeleteLanguage() {
  while (true) {
    const {payload} = yield take(DELETE_LANGUAGE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, DELETE_LANGUAGE, payloadApi);
      yield put(DELETE_LANGUAGE_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(DELETE_LANGUAGE_API.failure({errorMessage: error.message}));
    }
  }
}

function* watchdeleteSkill() {
  while (true) {
    const {payload} = yield take(DELETE_SKILLS_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, DELETE_SKILLS, payloadApi);
      yield put(DELETE_SKILLS_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(DELETE_SKILLS_API.failure({errorMessage: error.message}));
    }
  }
}

function* watchdeleteLicense() {
  while (true) {
    const {payload} = yield take(DELETE_LICENSE_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, DELETE_LICENSE, payloadApi);
      yield put(DELETE_LICENSE_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(DELETE_LICENSE_API.failure({errorMessage: error.message}));
    }
  }
}

function* watchdeltevideos() {
  while (true) {
    const {payload} = yield take(DELETE_PHOTO_VIDEOS_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(callRequest, DELETE_PHOTO_VIDEOS, payloadApi);
      yield put(DELETE_PHOTO_VIDEOS_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(DELETE_PHOTO_VIDEOS_API.failure({errorMessage: error.message}));
    }
  }
}

function* watchtermsandconditions() {
  while (true) {
    const {payload} = yield take(TERMS_AND_CONDITIONS_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(
        callRequest,
        TERMS_AND_CONDITIONS,
        payloadApi,
      );
      yield put(TERMS_AND_CONDITIONS_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(
        TERMS_AND_CONDITIONS_API.failure({errorMessage: error.message}),
      );
    }
  }
}

function* watchuploadphotos() {
  while (true) {
    const {payload} = yield take(PHOTO_LABEL_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(
        callRequest,
        PHOTO_LABEL,
        payloadApi,
      );
      yield put(PHOTO_LABEL_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(
        PHOTO_LABEL_API.failure({errorMessage: error.message}),
      );
    }
  }
}


function* watchuploadvideos() {
  while (true) {
    const {payload} = yield take(VIDEO_LABEL_API.request.type);
    const {payloadApi, cb} = payload;
    try {
      const response = yield call(
        callRequest,
        VIDEO_LABEL,
        payloadApi,
      );
      yield put(VIDEO_LABEL_API.success({data: response}));
      cb?.(response);
    } catch (error) {
      yield put(
        VIDEO_LABEL_API.failure({errorMessage: error.message}),
      );
    }
  }
}
export default function* root() {
  yield fork(watchUploadmedia);
  yield fork(watchuploadphotos);
  yield fork(watchuploadvideos);
  yield fork(watchdeleteLicense);
  yield fork(watchtermsandconditions);
  yield fork(watchdeleteLanguage);
  yield fork(watchdeleteSkill);
  yield fork(watchddeleteWorkExperience);
  yield fork(watchddeleteVisaPassport);
  yield fork(watchddeleteEducation);
  yield fork(watchdsendNotification);
  yield fork(watchdHistoryInvitation);
  yield fork(watchdDeclineInvitation);
  yield fork(watchGetInvitation);
  yield fork(watchGetChatRoom);
  yield fork(watchWorkExperience);
  yield fork(watchCreateChatRoom);
  yield fork(watchGetprofile);
  yield fork(watchProfilePercentage);
  yield fork(watchPgetjobs);
  yield fork(watchGetNotification);
  yield fork(watchGetExperience);
  yield fork(watchGetIntustry);
  yield fork(watchGetNotes);
  yield fork(watchsaveNotes);
  yield fork(watchPreferableIndustry);
  yield fork(watchEducation);
  yield fork(watchlanguage);
  yield fork(watchskill);
  yield fork(watchLicense);
  yield fork(watchjobTitle);
  yield fork(watchPreferablelocation);
  yield fork(watchGetEmpolyment);
  yield fork(watchGetJob);
  yield fork(watchPassportVisa);
  yield fork(watchUpdateNotes);
  yield fork(watchGetCountry);
  yield fork(watchGetLanguages);
  yield fork(watchGetSkills);
  yield fork(watchGetLicance);
  yield fork(watchGetCertificate);
  yield fork(watchPictureQustionTwo);
  yield fork(watchPictureQustionOne);
  yield fork(watchPictureQustionThree);
  yield fork(watchProfileLocker);
  yield fork(watchGetDegree);
  yield fork(watchGetState);
  // yield fork(watchUpdateProfile);
  yield fork(watchPostQuestion1);
  yield fork(watchPostQuestion2);
  yield fork(watchPostQuestion3);
  yield fork(watchPostQuestion4);
  yield fork(watchUploadResume);
  yield fork(watchinterViewJobs);
  yield fork(watchDeleteResume);
  yield fork(watchSalaryFrequency);
  yield fork(watchSalarycurrerency);
  yield fork(watchInterviewAccept);
  yield fork(watchDeleteJobs);
  yield fork(watchchangePassword);
  yield fork(watchdeltevideos);
  yield fork(watchGetCity);
}