import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, SigninResponse, TokenResponse } from '../sharedTypes/types';

const initialState: AuthState = {
  access: '',
  refresh: '',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ tokens: TokenResponse; user: SigninResponse }>,
    ) {
      state.access = action.payload.tokens.access;
      state.refresh = action.payload.tokens.refresh;
      state.user = action.payload.user;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.access = action.payload;
    },
    clearCredentials(state) {
      state.access = '';
      state.refresh = '';
      state.user = null;
    },
  },
});

export const { setCredentials, setAccessToken, clearCredentials } = authSlice.actions;
export default authSlice.reducer;