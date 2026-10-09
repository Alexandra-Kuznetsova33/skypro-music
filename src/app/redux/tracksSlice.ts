import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TracksState, TrackType } from '../sharedTypes/types';

const initialState: TracksState = {
  favoriteTracks: [],
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setFavoriteTracks(state, action: PayloadAction<TrackType[]>) {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks(state, action: PayloadAction<TrackType>) {
      const exists = state.favoriteTracks.some(
        (track) => track._id === action.payload._id,
      );
      if (!exists) {
        state.favoriteTracks.push(action.payload);
      }
    },
    removeLikedTracks(state, action: PayloadAction<TrackType>) {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id,
      );
    },
    clearFavoriteTracks(state) {
      state.favoriteTracks = [];
    },
  },
});

export const {
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  clearFavoriteTracks,
} = tracksSlice.actions;
export default tracksSlice.reducer;