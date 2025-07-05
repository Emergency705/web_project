import axios from "axios";
import { useAuthStore } from "../stores/auth";

const api = axios.create({
  // .env 파일에 VITE_API_URL='http://your-api-server.com' 와 같이 설정해야 합니다.
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    // 백엔드와 협의된 헤더 이름('authentication')을 사용합니다.
    config.headers.authentication = token;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
