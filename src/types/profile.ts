export interface UserDataTypes {
    name: string;
    email: string;
    updated_at: string;
    created_at: string;
    id: number;
    profileImage: string | null;
  }
  
  export interface FormDataTypes {
    name: string;
    email: string;
  }
  
  export interface PasswordDataTypes {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export interface MessageTypes {
    text: string;
    type: string;
  }