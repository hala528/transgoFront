import axios from "axios";
import { beasURL } from "./api";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export const Axios = axios.create({
  baseURL: beasURL,
});


// Axios.interceptors.request.use((config) => {

//   const token = cookie.get("transtop");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });
Axios.interceptors.request.use((config) => {
  const token = cookie.get("transtop");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const lang = localStorage.getItem("lang") || "ar";
  config.headers["Accept-Language"] = lang;

  return config;
});