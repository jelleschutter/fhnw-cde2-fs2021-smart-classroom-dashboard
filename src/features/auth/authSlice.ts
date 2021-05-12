import { createSlice } from '@reduxjs/toolkit'

const initialToken = localStorage.getItem('token');

const initialState = {
  loggedIn: !!initialToken,
  token: initialToken
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout(state) {
      state.loggedIn = false;
      state.token = '';
      localStorage.removeItem('token');
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer