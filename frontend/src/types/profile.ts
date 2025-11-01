export interface ProfileData {
  // Step 1: Basic Info
  name?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  height?: string;
  maritalStatus?: string;
  
  // Step 2: Location & Background
  city?: string;
  state?: string;
  country?: string;
  religion?: string;
  caste?: string;
  motherTongue?: string;
  
  // Step 3: Education & Career
  education?: string;
  occupation?: string;
  annualIncome?: string;
  employedIn?: string;
  
  // Step 4: About & Preferences
  bio?: string;
  interests?: string[];
  lookingFor?: string;
  familyType?: string;
  familyValues?: string;
}

export interface Profile extends ProfileData {
  id: string;
  phone: string;
  photos?: string[];
  verified?: boolean;
  premium?: boolean;
  createdAt?: string;
  updatedAt?: string;
}