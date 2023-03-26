import { configureStore } from '@reduxjs/toolkit';
// import adminReducer from '../features/adminAuth/adminSlice';
import authReducer from '../features/auth/authSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // admin: adminReducer
  },
});
