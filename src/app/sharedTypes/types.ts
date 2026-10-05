export interface TrackType {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  stared_user: string[];
}

export interface PlayerState {
  currentTrack: TrackType | null;
  isPlaying: boolean;
  isPlayerVisible: boolean;
  playlist: TrackType[];
  shuffle: boolean;
  loop: boolean;
  volume: number;
}

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  result: {
    username: string;
    email: string;
    _id: number;
  };
  success: boolean;
}

export interface SigninResponse {
  email: string;
  username: string;
  _id: number;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface SelectionType {
  _id: number;
  name: string;
  items: number[];
  owner: number | number[];
  __v: number;
}

export interface AuthState {
  access: string;
  refresh: string;
  user: SigninResponse | null;
}

export interface TracksState {
  favoriteTracks: TrackType[];
}