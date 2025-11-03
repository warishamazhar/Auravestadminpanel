import axios from "axios";
import store from "../redux/store";
// import appLogo from "../assets/appLogo.png";
import appLogo from "../assets/auravest-logo.png";
import appFavicon from "../assets/auravest-logo.png";
// import appFavicon from "../assets/appFavicon.png";

export const MainContent = {
  name: "SL BALA",
  appLogo: appLogo,
  favIcon: appFavicon,
  appName: "Auravest"
};

export const backendConfig = {
  // base: "https://api.p2.starchainlabs.in/api",
  // origin: "https://api.p2.starchainlabs.in/",

  // base: "https://q0vn1d1k-6095.inc1.devtunnels.ms/api",
  // origin: "https://q0vn1d1k-6095.inc1.devtunnels.ms/",

  // base: "http://localhost:6095/api",
  // origin: "http://localhost:6095",
  base: "https://api.yumekoai.world/api",
  origin: "https://api.yumekoai.world/",
  // base: "https://api.rbncropscience.in/api",
  // origin: "https://api.rbncropscience.in",
  // base: "https://cnfp6kct-8899.inc1.devtunnels.ms/api",
  // origin: "https://cnfp6kct-8899.inc1.devtunnels.ms",

};

export const Axios = axios.create({
  baseURL: backendConfig.base,
  withCredentials: true,
});
Axios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state?.isLoggedUser?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

