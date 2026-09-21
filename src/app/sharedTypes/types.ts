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