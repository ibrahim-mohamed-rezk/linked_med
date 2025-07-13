// import axios, { AxiosRequestHeaders } from "axios";
import axios from "axios";

const backendServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_Backend_URL,
  headers: {
    // ❌ لا تضع Content-Type هنا!
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


// // types
// type HeadersType = AxiosRequestHeaders;
// type ParamsType = Record<string, string | number | boolean>; // أو حدد حسب احتياجك
// type PostDataType = Record<string, unknown>; // أو use a specific interface

// types
type HeadersType = Record<string, string>; // ✅ هذا يحل المشكلة
type ParamsType = Record<string, string | number | boolean>;
type PostDataType = Record<string, unknown> | FormData;


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
export const deleteData = async(
  url: string,
  headers?: HeadersType
) => {
  try {
    const response = await backendServer.delete(url, {
      headers: { ...headers },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export default backendServer;
