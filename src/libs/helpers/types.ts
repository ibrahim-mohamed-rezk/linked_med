export interface ProfileData {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    image: string;
    created_at: string;
    updated_at: string;
  };
  full_name: string;
  phone_number: string;
  date_of_birth: string;
  nationality: string;
  current_country: string;
  current_city: string;
  current_job_title: string;
  specialty_field: string;
  years_of_experience: number;
  languages_spoken: string;
  language_certifications: string;
  preferred_contact_language: string;
  licensing_status: string;
  medical_degree_details: string;
  internship_residency_history: string;
  previous_countries_worked_in: string;
  linkedmed_case_manager: string;
  certificates: string;
  documents?: Document[];
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  status: boolean;
  msg: string;
  data: ProfileData;
}

interface Document {
  id: number;
  user_id: number;
  document: string;
  title: string;
  status: boolean;
  uploaded_at: string;
}