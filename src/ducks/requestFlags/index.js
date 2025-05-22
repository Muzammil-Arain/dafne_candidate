import { REQUEST, SUCCESS, FAILURE, makeAction } from '../ActionTypes';

// regular expression to check if we have request type action
const regularExpression = new RegExp(`(.*)_(${REQUEST}|${SUCCESS}|${FAILURE})`);

// action creators and types
export const resetRequestFlags = makeAction('RESET_REQUEST_FLAGS');

// inital state
const initialState = {};

// reducer
export default (state = initialState, action) => {
  // get action type
  const { type } = action;

  // reset flags on unmount
  if (type === 'RESET_REQUEST_FLAGS') {
    return {
      ...state,
      [action.payload.reducerKey]: {},
    };
  }

  // check action is reset

  // check if we have action type request,success or failure
  const matches = regularExpression.exec(type);

  // if it is not an request type action, return same state
  if (!matches) {
    return state;
  }

  // get data from payload
  const {
    errorMessage = '',
    isPullToRefresh = false,
    reset = false,
    identifier = undefined,
    page = undefined,
    data,
  } = action?.payload ?? {};

  // get requestName (POST_LIST) , requestState(REQUEST,SUCCESS,FAILURE)
  const [, requestName, requestState] = matches;

  // reducer key
  const reducerKey = identifier ? `${requestName}_${identifier}` : requestName;

  // page object
  const pageObject = page ? page : state?.[reducerKey]?.page ?? {};

  // last request records
  const lastRequestRecords =
    requestState === SUCCESS
      ? data?.length ?? 0
      : state?.[reducerKey]?.lastRecordsLength ?? 0;

  // update state with respect to action

  return {
    ...state,
    [reducerKey]: {
      loading: requestState === REQUEST,
      failure: requestState === FAILURE,
      reset: reset,
      isPullToRefresh: isPullToRefresh,
      errorMessage: requestState === FAILURE ? errorMessage : '',
      page: pageObject,
      lastRequestRecords,
    },
  };
};

// selectors
const defaultValue = {};
export const getRequestFlag = key => store => {
  // check if need to compare from an array
  if (Array.isArray(key)) {
    return (
      key.find(
        keyItem =>
          store.requestFlags[keyItem] && store.requestFlags[keyItem].loading,
      ) || defaultValue
    );
  }
  // simple key
  return store.requestFlags?.[key] ?? defaultValue;
};
