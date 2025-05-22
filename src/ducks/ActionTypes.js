import { createAction } from '@reduxjs/toolkit';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const RESET = 'RESET';

const makeRequesActions = base => {
  return {
    request: createAction(`${base}_${REQUEST}`),
    success: createAction(`${base}_${SUCCESS}`),
    failure: createAction(`${base}_${FAILURE}`),
    reset: createAction(`${base}_${RESET}`),
    type: base,
  };
};

const makeAction = base => {
  const action = createAction(base);
  return action;
};

export { REQUEST, SUCCESS, FAILURE, makeRequesActions, makeAction };
