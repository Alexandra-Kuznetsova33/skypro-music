import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerState, TrackType } from '../sharedTypes/types';

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  isPlayerVisible: false,
  playlist: [],
  shuffle: false,
  loop: false,
  volume: 0.5,
};

function getRandomIndex(length: number, exclude: number): number {
  if (length <= 1) return exclude;
  let idx = exclude;
  while (idx === exclude) {
    idx = Math.floor(Math.random() * length);
  }
  return idx;
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playTrack(state, action: PayloadAction<TrackType>) {
      state.currentTrack = action.payload;
      state.isPlaying = true;
      state.isPlayerVisible = true;
    },
    setPlaylist(state, action: PayloadAction<TrackType[]>) {
      state.playlist = action.payload;
    },
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    toggleShuffle(state) {
      state.shuffle = !state.shuffle;
    },
    toggleLoop(state) {
      state.loop = !state.loop;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    nextTrack(state) {
      if (!state.currentTrack || state.playlist.length === 0) return;
      const currentIndex = state.playlist.findIndex(
        (t) => t._id === state.currentTrack!._id,
      );
      if (currentIndex === -1) return;

      if (state.shuffle) {
        const nextIndex = getRandomIndex(state.playlist.length, currentIndex);
        state.currentTrack = state.playlist[nextIndex];
        state.isPlaying = true;
      } else if (currentIndex < state.playlist.length - 1) {
        state.currentTrack = state.playlist[currentIndex + 1];
        state.isPlaying = true;
      }
    },
    prevTrack(state) {
      if (!state.currentTrack || state.playlist.length === 0) return;
      const currentIndex = state.playlist.findIndex(
        (t) => t._id === state.currentTrack!._id,
      );
      if (currentIndex <= 0) return; // на первом треке ничего не делаем

      state.currentTrack = state.playlist[currentIndex - 1];
      state.isPlaying = true;
    },
    hidePlayer(state) {
      state.isPlayerVisible = false;
      state.currentTrack = null;
      state.isPlaying = false;
    },
  },
});

export const {
  playTrack,
  setPlaylist,
  togglePlay,
  setPlaying,
  toggleShuffle,
  toggleLoop,
  setVolume,
  nextTrack,
  prevTrack,
  hidePlayer,
} = playerSlice.actions;
export default playerSlice.reducer;
