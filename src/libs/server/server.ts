import axios, { AxiosRequestHeaders } from "axios";

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

// types
type HeadersType = AxiosRequestHeaders;
type ParamsType = Record<string, string | number | boolean>; // أو حدد حسب احتياجك
type PostDataType = Record<string, unknown>; // أو use a specific interface

// GET function
export const getData = async (
  url: string,
  params?: ParamsType,
  headers?: HeadersType
) => {
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

export const postData = async (
  url: string,
  data: PostDataType,
  headers?: HeadersType
) => {
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
