import axios from "axios";

export const torreApiCall = axios.create({
  baseURL: "https://torre.ai/api",
});

const apiCall = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
});

export default apiCall;
