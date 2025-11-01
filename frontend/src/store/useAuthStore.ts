import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types/auth.store';

const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setToken: (user: User, token: string) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      updateUser: (userData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;