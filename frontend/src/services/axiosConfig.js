import axios from "axios";
import CryptoJS from "crypto-js";
import CYS from "./Secret";
import { logout } from "./axiosClient";

export function createAxiosClient({ options, getCurrentAccessToken }) {
  const client = axios.create(options);
client.interceptors.request.use(
  (config) => {
    const token = getCurrentAccessToken();

    console.log("TOKEN:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

  client.interceptors.response.use(
    (response) => {
      if (response.data && typeof response.data.data === "string") {
        response.data.data = JSON.parse(
          CryptoJS.AES.decrypt(response.data.data, CYS).toString(
            CryptoJS.enc.Utf8,
          ),
        );
      }
      return response;
    },
    async (error) => {
      console.log(error);
      if (error.response === undefined) {
        alert("Internet failure or server disconnected");
      } else if (error.response.status === 401) {
        // const token = getCurrentAccessToken();
        // if (token === "dev-bypass-token") {
        //   return Promise.reject(error);
        // }
        logout();
        return axios(error.config);
      }
      return Promise.reject(error);
    },
  );
  return client;
}
