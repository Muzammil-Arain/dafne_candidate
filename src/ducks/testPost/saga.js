import { take, put, fork, call } from 'redux-saga/effects';

import { API_TEST_LISTING } from '@WebService';

import { testList, testScroll } from './';

// simple list
// function* watchTestListing() {
//   while (true) {
//     const { payload } = yield take(testList.request.type);
//     // const { payloadApi, reset } = payload;
//     try {
//       const response = yield call(callRequest, API_TEST_LISTING, payloadApi);
//       yield put(
//         testList.success({
//           data: response?.data ?? [],
//           page: response?.page ?? {},
//           reset,
//         }),
//       );
//     } catch (error) {
//       yield put(testList.failure({ errorMessage: error.message }));
//     }
//   }
// }

// simple list with identifier
// function* watchTestListing() {
//   while (true) {
//     const { payload } = yield take(testList.request.type);
//     const { payloadApi, reset, identifier } = payload;
//     try {
//       const response = yield call(callRequest, API_TEST_LISTING, payloadApi);
//       yield put(
//         testList.success({
//           data: response?.data ?? [],
//           page: response?.page ?? {},
//           reset,
//           identifier,
//         }),
//       );
//     } catch (error) {
//       yield put(testList.failure({ errorMessage: error.message, identifier }));
//     }
//   }
// }

// // simple scroll view
// function* watchTestListingScroolView() {
//   while (true) {
//     const { payload } = yield take(testScroll.request.type);
//     const { payloadApi } = payload;
//     try {
//       const response = yield call(callRequest, API_TEST_LISTING, payloadApi);
//       yield put(
//         testScroll.success({
//           data: response?.data ?? [],
//         }),
//       );
//     } catch (error) {
//       yield put(testList.failure({ errorMessage: error.message }));
//     }
//   }
// }

/* // simple scroll view with identifier
function* watchTestListingScroolView() {
  while (true) {
    const { payload } = yield take(testScroll.request.type);
    const { payloadApi, identifier } = payload;
    try {
      const response = yield call(callRequest, API_TEST_LISTING, payloadApi);
      yield put(
        testScroll.success({
          data: response?.data ?? [],
          identifier,
        }),
      );
    } catch (error) {
      yield put(testList.failure({ errorMessage: error.message, identifier }));
    }
  }
} */

export default function* root() {
  // yield fork(watchTestListing);
  // yield fork(watchTestListingScroolView);
}
