export interface PhoneRequest {
  phone: number;
  otp?: number;
}

export interface PhoneResponse {
  success: boolean;
  message: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    phone: string;
    name?: string;
    email?: string;
    profileComplete?: boolean;
    [key: string]: any;
  };
}