import { postData, getData } from "./server";
import Cookies from "js-cookie";
import { AxiosRequestHeaders } from "axios";

// Types
export interface LoginCredentials {
  email: string;
  password: string;
  [key: string]: unknown; // Add index signature
}

export interface SignupCredentials {
  email: string;
  password: string;
  [key: string]: unknown; // Add index signature
  // Add any additional fields needed for signup
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  image: string | null;
  role: string;
  status: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  [key: string]: unknown;
}

export interface ApiResponseData {
  token: string;
  user: UserProfile;
  [key: string]: unknown;
}

export interface ApiResponse {
  message: string;
  data: ApiResponseData;
  [key: string]: unknown;
}

// Cookie names
const AUTH_TOKEN_COOKIE = "auth_token";
const USER_DATA_COOKIE = "user_data";
const API_RESPONSE_COOKIE = "api_response";
const COOKIE_EXPIRY = 7; // days

/**
 * Store auth data in cookies
 */
const storeAuthData = (response: ApiResponse): void => {
  // Store full response data
  Cookies.set(API_RESPONSE_COOKIE, JSON.stringify(response), {
    expires: COOKIE_EXPIRY,
    sameSite: "strict",
  });

  // Store token for quick access
  if (response.data && response.data.token) {
    Cookies.set(AUTH_TOKEN_COOKIE, response.data.token, {
      expires: COOKIE_EXPIRY,
      sameSite: "strict",
    });
  }

  // Store user data for quick access
  if (response.data && response.data.user) {
    Cookies.set(USER_DATA_COOKIE, JSON.stringify(response.data.user), {
      expires: COOKIE_EXPIRY,
      sameSite: "strict",
    });
  }
};

/**
 * Clear auth data from cookies
 */
const clearAuthData = (): void => {
  Cookies.remove(AUTH_TOKEN_COOKIE);
  Cookies.remove(USER_DATA_COOKIE);
  Cookies.remove(API_RESPONSE_COOKIE);
};

/**
 * Login a user with email and password
 */
export const login = async (
  credentials: LoginCredentials
): Promise<ApiResponse> => {
  try {
    const response = await postData("/login", credentials);

    // Store auth data in cookies
    storeAuthData(response);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Register a new user
 */
export const signup = async (
  credentials: SignupCredentials
): Promise<ApiResponse> => {
  try {
    const response = await postData("/signup", credentials);

    // Store auth data in cookies
    storeAuthData(response);

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

/**
 * Logout the current user
 */
export const logout = async (): Promise<void> => {
  try {
    const token = getAuthToken();
    if (token) {
      await postData("/logout", {}, {
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders);
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Clear cookies regardless of API response
    clearAuthData();
  }
};

/**
 * Get auth token from cookies
 */
export const getAuthToken = (): string | undefined => {
  return Cookies.get(AUTH_TOKEN_COOKIE);
};

/**
 * Get the user profile from cookies
 */
export const getUserFromCookies = (): UserProfile | null => {
  const userData = Cookies.get(USER_DATA_COOKIE);
  if (!userData) return null;

  try {
    return JSON.parse(userData) as UserProfile;
  } catch (e) {
    console.error("Error parsing user data from cookie:", e);
    return null;
  }
};

/**
 * Get the complete API response data from cookies
 */
export const getFullAuthData = (): ApiResponse | null => {
  const responseData = Cookies.get(API_RESPONSE_COOKIE);
  if (!responseData) return null;

  try {
    return JSON.parse(responseData) as ApiResponse;
  } catch (e) {
    console.error("Error parsing response data from cookie:", e);
    return null;
  }
};

/**
 * Get the current user's profile from API
 */
export const getCurrentUser = async (): Promise<UserProfile | null> => {
  try {
    const token = getAuthToken();

    if (!token) {
      return getUserFromCookies();
    }

    const response = await getData("/user/profile", {}, {
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders);

    // Check if response has the expected structure
    if (response.data && response.data.user) {
      storeAuthData(response);
      return response.data.user;
    }

    return response.user || null;
  } catch (error) {
    console.error("Get user error:", error);
    // Fall back to cookie data if API call fails
    return getUserFromCookies();
  }
};

/**
 * Check if the user is authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") {
    return false; // We're on the server side
  }
  return !!getAuthToken();
};
