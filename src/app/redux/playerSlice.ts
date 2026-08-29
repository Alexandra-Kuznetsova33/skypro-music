import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerState, TrackType } from '../sharedTypes/types';

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  isPlayerVisible: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playTrack(state, action: PayloadAction<TrackType>) {
      state.currentTrack = action.payload;
      state.isPlaying = true;
      state.isPlayerVisible = true;
    },
    togglePlay(state) {
      if (state.currentTrack) {
        state.isPlaying = !state.isPlaying;
      }
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    hidePlayer(state) {
      state.isPlayerVisible = false;
      state.currentTrack = null;
      state.isPlaying = false;
    },
  },
});

export const { playTrack, togglePlay, setPlaying, hidePlayer } = playerSlice.actions;
export default playerSlice.reducer;