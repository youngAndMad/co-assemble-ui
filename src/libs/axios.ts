import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080", //todo move to env
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API error", error);
    if (error.status === 401) {
      //todo redirect to sign-in
      // cookie.clearUser();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
