import axios from "axios";

export const torreApiCall = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const apiCall = axios.create({
  baseURL: "",
});

export default apiCall;
