import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  user: {
    role: localStorage.getItem('userRole'),
  },
  userId: localStorage.getItem('userId'),
  isAuthenticated: false,
  loading: false,
  error: null,
  registerSuccess: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.user.id; 
      localStorage.setItem('userId', action.payload.user.id);
      localStorage.setItem('userRole', action.payload.user.role);
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.userId = null; 
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userId'); 
      localStorage.removeItem('userRole');
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
      state.registerSuccess = false;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.registerSuccess = true;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.registerSuccess = false;
    },
    clearRegisterStatus: (state) => {
      state.registerSuccess = false;
      state.error = null;
    }
  }
});

export const { 
  loginStart, loginSuccess, loginFailure, logout,
  registerStart, registerSuccess, registerFailure, clearRegisterStatus 
} = authSlice.actions;

export default authSlice.reducer;
