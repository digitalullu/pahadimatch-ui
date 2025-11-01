export interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  profileComplete?: boolean;
  [key: string]: any;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setToken: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}