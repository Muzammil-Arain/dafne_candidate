import {makeAction, makeRequesActions} from '../ActionTypes';
import {createReducer} from '@reduxjs/toolkit';

export const LOGOUT_API = makeRequesActions('LOGOUT');
export const WORK_EXPERIENCE_API = makeRequesActions('WORK_EXPERIENCE');
export const EDUCATION_API = makeRequesActions('EDUCATION');
export const PASSPORT_VISA_API = makeRequesActions('PASSPORT_VISA');
export const LANGUAGE_API = makeRequesActions('LANGUAGE');
export const SKILLS_API = makeRequesActions('SKILLS');
export const LICENSE_API = makeRequesActions('LICENSE');
export const JOB_TITLE_API = makeRequesActions('JOBS_TITLE');
export const PREFERABLE_INDUSTRY_API = makeRequesActions('PREFERABLE_INDUSTRY');
export const PREFERABLE_LOCATION_API = makeRequesActions('PREFERABLE_LOCATION');
export const GET_NOTES_API = makeRequesActions('GET_NOTES');
export const SAVE_NOTES_API = makeRequesActions('SAVE_NOTES');
export const PROFILE_LOCK_API = makeRequesActions('PROFILE_LOCK');
export const GET_INDUSTRY_API = makeRequesActions('GET_INDUSTRY');
export const GET_EMPLOYMENT_API = makeRequesActions('GET_EMPLOYMENT');
export const GET_JOB_API = makeRequesActions('GET_JOB');
export const GET_COUNTRIES_API = makeRequesActions('API_GET_COUNTRIES');
export const GET_STATE_API = makeRequesActions('API_GET_STATES');
export const API_GET_CITY_API = makeRequesActions('API_GET_CITY')
export const GET_EXPERIENCE_API = makeRequesActions('GET_EXPERIENCE');
export const GET_LANGUAGES_API = makeRequesActions('GET_LANGUAGES');
export const GET_SKILLS_API = makeRequesActions('GET_SKILLS');
export const GET_LICANCE_API = makeRequesActions('GET_LICANCE');
export const GET_CERTIFICATE_API = makeRequesActions('GET_CERTIFICATE');
export const UPDATE_NOTES_API = makeRequesActions('UPDATE_NOTES');
export const GET_DEGREE_API = makeRequesActions('GET_DEGREE');
export const CREATE_CHATROOM_API = makeRequesActions('CREATE_CHATROOM');
export const PROFESSIONAL_PROFILE_API = makeRequesActions(
  'PROFESSIONAL_PROFILE',
);
export const BEHIND_UNIFORM_API = makeRequesActions('BEHIND_UNIFORM');
export const UPLOAD_MEDIA_API = makeRequesActions('UPLOAD_MEDIA');
export const FAVORITE_HOBBY_API = makeRequesActions('FAVORITE_HOBBY');
export const GET_NOTIFICATION_API = makeRequesActions('GET_NOTIFICATION');
// export const UPDATE_PROFILE_API = makeRequesActions('UPDATE_PROFILE');
export const VIDEO_QUESTION_1_API = makeRequesActions('VIDEO_QUESTION_1');
export const VIDEO_QUESTION_2_API = makeRequesActions('VIDEO_QUESTION_2');
export const VIDEO_QUESTION_3_API = makeRequesActions('VIDEO_QUESTION_3');
export const VIDEO_QUESTION_4_API = makeRequesActions('VIDEO_QUESTION_4');
export const GET_INTERVIEW_JOBS_API = makeRequesActions('GET_INTERVIEW_JOBS');
export const UPLOAD_RESUME_API = makeRequesActions('UPLOAD_RESUME');
export const PROFILE_PERCENTAGE_API = makeRequesActions('PROFILE_PERCENTAGE');
export const DELETE_RESUME_API = makeRequesActions('DELETE_RESUME');
export const CANDIDATE_PROFILE_API = makeRequesActions('CANDIDATE_PROFILE');
export const GET_CHATROOM_API = makeRequesActions('GET_CHATROOM');
export const GET_INVITATIONS_API = makeRequesActions('GET_INVITATIONS');
export const ACCEPT_INVITATIONS_API = makeRequesActions('ACCEPT_INVITATIONS');
export const SALARY_CURRENCY_API = makeRequesActions('SALARY_CURRENCY');
export const SALARY_FREQYENCYS_API = makeRequesActions('SALARY_FREQYENCY');
export const INTERVIEW_HISTORY_API = makeRequesActions('INTERVIEW_HISTORY');
export const INTERVIEW_DECLINE_API = makeRequesActions('INTERVIEW_DECLINE');
export const INTERVIEW_ACCEPT_API = makeRequesActions('INTERVIEW_ACCEPT');
export const SEND_NOTIFICATION_API = makeRequesActions('SEND_NOTIFICATION');

export const PHOTO_LABEL_API = makeRequesActions('PHOTO_LABEL');
export const VIDEO_LABEL_API = makeRequesActions('VIDEO_LABEL');


export const DELETE_WORK_EXPERIENCE_API = makeRequesActions('DELETE_WORK_EXPERIENCE');
export const DELETE_EDUCATION_API = makeRequesActions('DELETE_EDUCATION');
export const DELETE_PASSPORT_VISA_API = makeRequesActions('DELETE_PASSPORT_VISA');

export const DELETE_LANGUAGE_API = makeRequesActions('DELETE_LANGUAGE');
export const DELETE_SKILLS_API = makeRequesActions('DELETE_SKILLS');
export const DELETE_LICENSE_API = makeRequesActions('DELETE_LICENSE');
export const DELETE_PERFERABLE_API = makeRequesActions('DELETE_PERFERABLE');
export const CHANGE_PASSWORD_API = makeRequesActions('CHANGE_PASSWORD');
export const DELETE_PHOTO_VIDEOS_API = makeRequesActions('DELETE_PHOTO_VIDEOS');
export const TERMS_AND_CONDITIONS_API = makeRequesActions('TERMS_AND_CONDITIONS');


const initalState = {
  data: {},
};

export default createReducer(initalState, builder => {
  builder.addCase(LOGOUT_API.success, (state, action) => {});
  builder.addCase(CHANGE_PASSWORD_API.success, (state, action) => {});
  builder.addCase(API_GET_CITY_API.success, (state, action) => {});
  builder.addCase(TERMS_AND_CONDITIONS_API.success, (state, action) => {});
  builder.addCase(DELETE_PHOTO_VIDEOS_API.success, (state, action) => {});
  builder.addCase(DELETE_PERFERABLE_API.success, (state, action) => {});
  builder.addCase(SEND_NOTIFICATION_API.success, (state, action) => {});
  builder.addCase(SKILLS_API.success, (state, action) => {});
  builder.addCase(INTERVIEW_ACCEPT_API.success, (state, action) => {});
  builder.addCase(UPLOAD_MEDIA_API.success, (state, action) => {});
  builder.addCase(GET_INVITATIONS_API.success, (state, action) => {});
  builder.addCase(CREATE_CHATROOM_API.success, (state, action) => {});
  builder.addCase(GET_CHATROOM_API.success, (state, action) => {});
  builder.addCase(ACCEPT_INVITATIONS_API.success, (state, action) => {});
  builder.addCase(WORK_EXPERIENCE_API.success, (state, action) => {});
  builder.addCase(EDUCATION_API.success, (state, action) => {});
  builder.addCase(LANGUAGE_API.success, (state, action) => {});
  builder.addCase(LICENSE_API.success, (state, action) => {});
  builder.addCase(JOB_TITLE_API.success, (state, action) => {});
  builder.addCase(PREFERABLE_INDUSTRY_API.success, (state, action) => {});
  builder.addCase(PREFERABLE_LOCATION_API.success, (state, action) => {});
  builder.addCase(GET_NOTES_API.success, (state, action) => {});
  builder.addCase(SAVE_NOTES_API.success, (state, action) => {});
  builder.addCase(PROFILE_LOCK_API.success, (state, action) => {});
  builder.addCase(GET_INDUSTRY_API.success, (state, action) => {});
  builder.addCase(GET_EMPLOYMENT_API.success, (state, action) => {});
  builder.addCase(GET_JOB_API.success, (state, action) => {});
  builder.addCase(PASSPORT_VISA_API.success, (state, action) => {
    // initalState.PASSPORT_VISA = action?.payload?.data;
  });
  builder.addCase(GET_COUNTRIES_API.success, (state, action) => {
    // initalState.COUNTRIES = action?.payload?.data;
  });
  builder.addCase(GET_EXPERIENCE_API.success, (state, action) => {});
  builder.addCase(GET_LANGUAGES_API.success, (state, action) => {});
  builder.addCase(GET_SKILLS_API.success, (state, action) => {});
  builder.addCase(GET_LICANCE_API.success, (state, action) => {});
  builder.addCase(GET_CERTIFICATE_API.success, (state, action) => {});
  builder.addCase(UPDATE_NOTES_API.success, (state, action) => {});
  builder.addCase(GET_DEGREE_API.success, (state, action) => {});
  builder.addCase(GET_STATE_API.success, (state, action) => {});
  builder.addCase(GET_NOTIFICATION_API.success, (state, action) => {});
  builder.addCase(PROFESSIONAL_PROFILE_API.success, (state, action) => {});
  builder.addCase(BEHIND_UNIFORM_API.success, (state, action) => {});
  builder.addCase(FAVORITE_HOBBY_API.success, (state, action) => {
    // console.log('🚀 ~ builder.addCase ~ action:', action);
    // console.log('🚀 ~ builder.addCase ~ state:', state);
  });
  // builder.addCase(UPDATE_PROFILE_API.success, (state, action) => {

  //  });
  builder.addCase(VIDEO_QUESTION_1_API.success, (state, action) => {});
  builder.addCase(VIDEO_QUESTION_2_API.success, (state, action) => {});
  builder.addCase(VIDEO_QUESTION_3_API.success, (state, action) => {});
  builder.addCase(VIDEO_QUESTION_4_API.success, (state, action) => {});
  builder.addCase(GET_INTERVIEW_JOBS_API.success, (state, action) => {});
  builder.addCase(UPLOAD_RESUME_API.success, (state, action) => {});
  builder.addCase(PROFILE_PERCENTAGE_API.success, (state, action) => {});
  builder.addCase(DELETE_RESUME_API.success, (state, action) => {});
  builder.addCase(CANDIDATE_PROFILE_API.success, (state, action) => {});
  builder.addCase(SALARY_CURRENCY_API.success, (state, action) => {});
  builder.addCase(SALARY_FREQYENCYS_API.success, (state, action) => {});
  builder.addCase(INTERVIEW_HISTORY_API.success, (state, action) => {});
  builder.addCase(INTERVIEW_DECLINE_API.success, (state, action) => {});

  builder.addCase(DELETE_WORK_EXPERIENCE_API.success, (state, action) => {});
  builder.addCase(DELETE_EDUCATION_API.success, (state, action) => {});
  builder.addCase(DELETE_PASSPORT_VISA_API.success, (state, action) => {});

  builder.addCase(DELETE_LANGUAGE_API.success, (state, action) => {});
  builder.addCase(DELETE_SKILLS_API.success, (state, action) => {});
  builder.addCase(DELETE_LICENSE_API.success, (state, action) => {});

  builder.addCase(PHOTO_LABEL_API.success, (state, action) => {});
  builder.addCase(VIDEO_LABEL_API.success, (state, action) => {});


});