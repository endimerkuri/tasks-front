import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';

interface AuthState {
  accessToken?: string | null;
  refreshToken?: string | null;
}

const initialState = {
  accessToken: null,
  refreshToken: null,
} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAuth: (state, action: PayloadAction<AuthState>) => {
      return { ...state, ...action.payload };
    },
    removeAuth: (_state, _action: PayloadAction<AuthState>) => {
      return { accessToken: null, refreshToken: null };
    },
  },
});

export const { addAuth, removeAuth } = authSlice.actions;

export const tokenSelector = (state: RootState) =>
  _.get(state, 'auth.accessToken', null);
export const refreshTokenSelector = (state: RootState) =>
  _.get(state, 'auth.refreshToken', null);

export default authSlice.reducer;
