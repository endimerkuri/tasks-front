import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import loaderReducer from './slices/loader';
import meReducer from './slices/me';

const rootReducer = combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  me: meReducer,
});

export default rootReducer;
