import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '../features/auth/authSlice';
import appointmentSlice from '../features/appointment/appointmentSlice';
import profileSlice from '../features/profile/profileSlice';

const rootReducer = combineReducers({
  authSlice,
  appointmentSlice,
  profileSlice,
});

export default rootReducer;
