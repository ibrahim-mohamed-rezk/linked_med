export interface HomeTypes {
  intro: {
    web: string;
    mobile: string;
  };
  about: {
    web: string;
    mobile: string;
  };
  service: {
    web: string;
    mobile: string;
  };
}


export interface UserDataTypes {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  role?: string;
  status?: string;
  profileImage?: string | null;
  id?: number;
  updated_at?: string;
  created_at?: string;
}