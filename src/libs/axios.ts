import axios from "axios";

const defaultApiClient = axios.create({
  baseURL: "http://localhost:8080", //todo move to env
});

defaultApiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API error", error);
    if (error.status === 401) {
      //todo redirect to login
      localStorage.removeItem("profile");
    }
    return Promise.reject(error);
  }
);

export default defaultApiClient;
