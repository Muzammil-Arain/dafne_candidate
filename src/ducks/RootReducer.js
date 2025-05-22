import { combineReducers } from 'redux';

import requestFlags from './requestFlags';
import network from './network';
import testPost from './testPost';
import userRole from './userRole';
import user from './user';
import auth from './auth';

const appReducer = combineReducers({
  requestFlags,
  network,
  testPost,
  userRole,
  user,
  auth
});

export default appReducer;
