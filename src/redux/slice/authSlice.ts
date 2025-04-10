import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isLogin?: boolean,
}

const initialState: InitialState = {
  isLogin: !!localStorage.getItem('access-token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthReducer: () => initialState,
    resetIsLogin: (state: any) => {
      state.isLogin = false;
    },
    setIsLogin: (state: any) => {
      state.isLogin = true;
    }
  },
});
export const { resetAuthReducer, resetIsLogin, setIsLogin } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
export const selectAuth = (state: any) => state.auth;
