import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';

interface MeState {
  id?: string | undefined;
  fullName?: string | undefined;
}

const initialState = {} as MeState;

export const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    addMe: (state, action: PayloadAction<Partial<MeState>>) => {
      return { ...state, ...action.payload };
    },
    removeMe: () => {
      return initialState;
    },
  },
});

export const { addMe, removeMe } = meSlice.actions;

export const fullName = (state: RootState) => _.get(state, 'me.fullName', '');
export const userId = (state: RootState) => _.get(state, 'me.id', '');

export default meSlice.reducer;
