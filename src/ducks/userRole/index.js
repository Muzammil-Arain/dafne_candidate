import {createReducer} from '@reduxjs/toolkit';
import {makeAction} from '../ActionTypes';
import datahandler from '../../helper/datahandler';

// action creators and types
export const updateUserRole = makeAction('UPDATE_USER_ROLE');

// init state
const initalState = {userRole: false};

// init reducer
export default createReducer(initalState, builder => {
  builder.addCase(updateUserRole, (state, action) => {
    state.userRole = action.payload.userRole;
    datahandler.setUserRoleStatus(action.payload.userRole);
  });
});

// selectors
export const getUserRole = state => state.userRole.userRole;
