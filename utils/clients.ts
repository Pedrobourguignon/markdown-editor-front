import { API_URLS } from "@/helpers/api";
import axios from "axios";

export const mainClient = axios.create({
  baseURL: API_URLS.main,
  withCredentials: false,
});

export const checkJwt = (jwt?: string) => {
  const token = jwt || localStorage.getItem("accessToken");
  mainClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};
