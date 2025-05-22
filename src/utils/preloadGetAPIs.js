// src/utils/preloadGetAPIs.js

import {
    GET_CERTIFICATE_API,
    GET_COUNTRIES_API,
    GET_DEGREE_API,
    GET_EMPLOYMENT_API,
    GET_INDUSTRY_API,
    GET_JOB_API,
    GET_LANGUAGES_API,
    GET_LICANCE_API,
    GET_SKILLS_API,
    PASSPORT_VISA_API,
  } from '../ducks/app';
  
  export const preloadGetAPIs = async dispatch => {
    const apiBatches = [
      // Batch 1
      [
        {
          action: GET_INDUSTRY_API,
          transform: val => ({...val, name: val.industry_name}),
        },
        {
          action: GET_EMPLOYMENT_API,
          transform: val => ({...val, name: val.employment_type}),
        },
        {
          action: PASSPORT_VISA_API,
          transform: val => ({...val, name: val}),
        },
      ],
      // Batch 2
      [
        {
          action: GET_JOB_API,
          transform: val => ({...val, name: val.job_title}),
        },
        {
          action: GET_COUNTRIES_API,
        },
      ],
      // Batch 3
      [
        {action: GET_LANGUAGES_API},
        {action: GET_SKILLS_API},
        {action: GET_DEGREE_API},
      ],
      // Batch 4
      [{action: GET_LICANCE_API}, {action: GET_CERTIFICATE_API}],
    ];
  
    for (let batch of apiBatches) {
      for (let item of batch) {
        await dispatchApiCall({ ...item, dispatch });
        await new Promise(res => setTimeout(res, 500)); // optional delay between each call
      }
      await new Promise(res => setTimeout(res, 1000)); // optional delay between batches
    }
  };
  
  const dispatchApiCall = ({action, transform, dispatch}) => {
    return new Promise(resolve => {
      dispatch(
        action.request({
          payloadApi: {},
          cb: res => {
            console.log("✅ API Response:", res);
            const result = transform ? res?.map(transform) : res;
           dispatch(action.success(result));
            resolve();
          },
        }),
      );
    });
  };
  