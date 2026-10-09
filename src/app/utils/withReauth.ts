import { AxiosError } from 'axios';
import { AppDispatch } from '../redux/store';
import { setAccessToken } from '../redux/authSlice';
import { refreshToken } from '../services/auth/authApi';

export const withReauth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  refresh: string,
  dispatch: AppDispatch,
): Promise<T> => {
  try {
    return await apiFunction('');
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      try {
        const newToken = await refreshToken(refresh);
        dispatch(setAccessToken(newToken.access));
        return await apiFunction(newToken.access);
      } catch (refreshError) {
        throw refreshError;
      }
    }

    throw error;
  }
};