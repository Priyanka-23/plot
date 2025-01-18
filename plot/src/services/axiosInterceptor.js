import axios from "axios";

export const axiosInstance = axios.create({
  baseUrl: "/api",
  timeout: 10000,
});
