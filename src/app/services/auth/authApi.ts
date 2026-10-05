import axios from 'axios';
import { API_BASE_URL } from '../constants';
import {
  SignupRequest,
  SignupResponse,
  SigninRequest,
  SigninResponse,
  TokenResponse,
} from '../../sharedTypes/types';

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  const res = await axios.post<SignupResponse>(
    `${API_BASE_URL}/user/signup/`,
    data,
    { headers: { 'content-type': 'application/json' } },
  );
  return res.data;
}

export async function signin(data: SigninRequest): Promise<SigninResponse> {
  const res = await axios.post<SigninResponse>(
    `${API_BASE_URL}/user/login/`,
    data,
    { headers: { 'content-type': 'application/json' } },
  );
  return res.data;
}

export async function getToken(data: SigninRequest): Promise<TokenResponse> {
  const res = await axios.post<TokenResponse>(
    `${API_BASE_URL}/user/token/`,
    data,
    { headers: { 'content-type': 'application/json' } },
  );
  return res.data;
}

export async function refreshToken(refresh: string): Promise<{ access: string }> {
  const res = await axios.post<{ access: string }>(
    `${API_BASE_URL}/user/token/refresh/`,
    { refresh },
    { headers: { 'content-type': 'application/json' } },
  );
  return res.data;
}