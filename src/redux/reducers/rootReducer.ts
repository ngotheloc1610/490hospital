import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '../features/auth/authSlice';
import appointmentSlice from '../features/appointment/appointmentSlice';

const rootReducer = combineReducers({
  authSlice,
  appointmentSlice,
});

export default rootReducer;
