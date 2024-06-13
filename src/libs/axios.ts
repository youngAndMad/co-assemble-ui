import useCookie from "@/hooks/useCookie";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080", //todo move to env
});

const cookie = useCookie();

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API error", error);
    if (error.status === 401) {
      //todo redirect to login
      cookie.clearUser();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
