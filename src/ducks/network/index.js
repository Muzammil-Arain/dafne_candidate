import { createReducer } from '@reduxjs/toolkit';
import { makeAction } from '../ActionTypes';

// action creators and types
export const updateNetWorkInfo = makeAction('UPDATE_NETWORK_INFO');

// init state
const initalState = { isNetworkConnected: false };

// init reducer
export default createReducer(initalState, builder => {
  builder.addCase(updateNetWorkInfo, (state, action) => {
    state.isNetworkConnected = action.payload.isNetworkConnected;
  });
});

// selectors
export const isNetworkConnected = state => state.network.isNetworkConnected;
