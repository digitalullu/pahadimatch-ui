import { AuthResponse, PhoneResponse, PhoneRequest } from '@/types/login';
import axiosInstance from './axiosInstance';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://api.dev.pahadimatch.com/v1';

export const sendOtp = async (payload: PhoneRequest) => {
  const res = await axiosInstance.post<PhoneResponse>(
    `${API_URL}/auth/phone/request-otp`,
    payload
  );
  return res;
};

export const verifyOtp = async (payload: PhoneRequest) => {
  const res = await axiosInstance.post<AuthResponse>(
    `${API_URL}/auth/phone/verify-otp`,
    payload
  );
  return res;
};

export const logout = async () => {
  const res = await axiosInstance.post(`${API_URL}/auth/logout`);
  return res;
};