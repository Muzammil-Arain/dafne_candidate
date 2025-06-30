import {combineReducers} from 'redux';

import requestFlags from './requestFlags';
import network from './network';
import testPost from './testPost';
import userRole from './userRole';
import user from './user';

const appReducer = combineReducers({
  requestFlags,
  network,
  testPost,
  userRole,
  user
});

export default appReducer;
