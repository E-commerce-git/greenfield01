import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import wishlistReducer from '../redux/wishlistSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer,
  },
});

export default store;