import { fork } from 'redux-saga/effects';
import testPost from './testPost/saga';
import user from './app/saga';
import auth from './auth/saga';

export default function* root() {
  yield fork(testPost);
  yield fork(user);
  yield fork(auth);

}
