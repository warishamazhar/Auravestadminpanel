import axios from "axios";
import store, { persistor } from "../redux/store";
import { logoutUser } from "../redux/slices/authSlice";
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

  // base: "http://localhost:5009/api",
  // origin: "http://localhost:5009",

  base: "https://api.auravest.world/api",
  origin: "https://api.auravest.world/",
  
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

// Response interceptor to handle authentication errors only
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response?.data?.message || error.response?.data?.error || "";
      const messageLower = message.toLowerCase();
      
      // Only logout on authentication errors (401, 403) or specific auth-related messages
      // Don't logout on 404 (resource not found) or other client errors
      const isAuthError = status === 401 || status === 403;
      const isAuthMessage = 
        (messageLower === "user not found" && status === 401) || // Only if 401 with exact message
        messageLower.includes("unauthorized") ||
        (messageLower.includes("token") && (messageLower.includes("invalid") || messageLower.includes("expired"))) ||
        messageLower.includes("authentication failed") ||
        messageLower.includes("please login") ||
        messageLower.includes("session expired");
      
      if (isAuthError || isAuthMessage) {
        // Clear user data from Redux
        store.dispatch(logoutUser());
        
        // Purge redux-persist storage
        persistor.purge();
        
        // Clear localStorage and sessionStorage
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to landing page
        const currentPath = window.location.pathname;
        if (currentPath !== "/" && currentPath !== "/login" && currentPath !== "/admin/login" && currentPath !== "/register") {
          window.location.href = "/";
        }
      }
    }
    return Promise.reject(error);
  }
);

