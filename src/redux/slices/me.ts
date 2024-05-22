import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';

interface MeState {
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  email?: string | null;
  role?: string | null;
}

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  username: null,
  email: null,
  role: null,
} as MeState;

export const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    addMe: (state, action: PayloadAction<MeState>) => {
      return { ...state, ...action.payload };
    },
    removeMe: (_state, _action: PayloadAction<MeState>) => {
      return initialState;
    },
  },
});

export const { addMe, removeMe } = meSlice.actions;

export const initials = (state: RootState) => {
  const first = _.get(state, 'me.firstName', 'F');
  const last = _.get(state, 'me.lastName', 'L');
  if (first && last) {
    return `${first.charAt(0)}${last.charAt(0)}`;
  }
  return null;
};
export const firstName = (state: RootState) => _.get(state, 'me.firstName', '');
export const lastName = (state: RootState) => _.get(state, 'me.lastName', '');
export const userId = (state: RootState) => _.get(state, 'me.id', '');
export const userData = (state: RootState) => _.get(state, 'me', initialState);

export default meSlice.reducer;
