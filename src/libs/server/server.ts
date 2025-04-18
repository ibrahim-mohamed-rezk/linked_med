import axios from "axios";

const backendServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_Backend_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    lang:
      (typeof window !== "undefined" &&
        document.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith("NEXT_LOCALE="))
          ?.split("=")[1]) ||
      "en",
  },
  timeout: 10000,
});

// GET function
export const getData = async (url: string, params?: any, headers?: any) => {
  try {
    const response = await backendServer.get(url, {
      params,
      headers: { ...headers },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (url: string, data: any, headers?: any) => {
  try {
    const response = await backendServer.post(url, data, {
      headers: { ...headers },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default backendServer;
