import axios from "axios";
import { getToken } from "./utils";

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
});

http.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers["Authorization"] = `Token ${getToken()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
