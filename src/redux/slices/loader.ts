import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import _ from 'lodash';

interface SpinnerState {
  text?: string | null;
  show: boolean;
  splash?: boolean;
  bank?: boolean;
}

const initialState: SpinnerState = {
  text: null,
  show: false,
  splash: false,
  bank: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showSpinner: (
      state,
      action: PayloadAction<{ text: string; splash?: boolean; bank?: boolean }>,
    ) => {
      const { text, splash = false, bank = false } = action.payload;
      return { ...state, show: true, text, splash, bank };
    },
    hideSpinner: (state) => {
      return { ...state, show: false, text: null, bank: false };
    },
  },
});

export const { showSpinner, hideSpinner } = loaderSlice.actions;

export const isActive = (state: RootState) =>
  _.get(state, 'loader.show', false);
export const loaderText = (state: RootState) =>
  _.get(state, 'loader.text', 'pleaseWait');
export const splash = (state: RootState) =>
  _.get(state, 'loader.splash', false);
export const bank = (state: RootState) => _.get(state, 'loader.bank', false);

export default loaderSlice.reducer;
