import { ProfileData, Profile } from '@/types/profile';
import axiosInstance from './axiosInstance';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://api.dev.pahadimatch.com/v1';

export const createUpdateProfile = async (payload: ProfileData) => {
  const res = await axiosInstance.patch(`${API_URL}/profile/create`, payload);
  return res;
};

export const getProfiles = async (pageNumber: number = 1) => {
  const res = await axiosInstance.get<{ profiles: Profile[]; total: number }>(`${API_URL}/profile/list?page=${pageNumber}`);
  return res;
};

export const getMyProfile = async () => {
  const res = await axiosInstance.get<Profile>(`${API_URL}/profile/me`);
  return res;
};