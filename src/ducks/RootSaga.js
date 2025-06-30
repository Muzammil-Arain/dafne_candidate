import { fork } from 'redux-saga/effects';
import testPost from './testPost/saga';
import user from './user/saga';

export default function* root() {
  yield fork(testPost);
  yield fork(user);

}
