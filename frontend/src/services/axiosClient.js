import { createAxiosClient } from "./axiosConfig";
import { jwtDecode } from "jwt-decode";

// const BASE_URL = "http://localhost:9000/api/v1/";
 const BASE_URL = "https://api.bioindication.in/api/v1/";

//const BASE_URL = "http://localhost:5000/api/v1/";

export function getCurrentAccessToken() {
  return localStorage.getItem("accessToken");
}

export function isLoggedIn() {
  if (localStorage.getItem("accessToken")) {
    return true;
  } else {
    return false;
  }
}

export async function logout() {  
  const user = localStorage.getItem("user");
  localStorage.clear();
  
  window.location.href = "/";
  return 0;
}

export function setCurrentAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

export function setCurrentUser(user) {
  return localStorage.setItem("user", JSON.stringify(user));
}

export function getphoneNumber() {
  let token = localStorage.getItem("accessToken");
  if (token) {
    let decoded = jwtDecode(token);
    // console.log("user Details bro!=",decoded)
    return decoded.phoneNumber || "";
  } else {
    return "";
  }
}

export function getUserId() {
  let token = localStorage.getItem("accessToken");
  if (token) {
    let decoded = jwtDecode(token);
    // console.log("user Details bro!=",decoded)
    return decoded.id || "";
  } else {
    return "";
  }
}

export function getUserRole() {
  let token = localStorage.getItem("accessToken");
  if (token) {
    let decoded = jwtDecode(token);
    // console.log("user Details bro!=",decoded)
    return decoded.role || "";
  } else {
    return "";
  }
}

export function getUserName() {
  let token = localStorage.getItem("accessToken");
  if (token) {
    let decoded = jwtDecode(token);
    // console.log("user Details bro!=",decoded)
    return decoded.name || "";
  } else {
    return "";
  }
}

export const client = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 300000,
    headers: {},
  },
  getCurrentAccessToken,
});
