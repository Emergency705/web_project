// src/apis/axios.ts
import axios from "axios";
import { useAuthStore } from "../stores/auth";

// baseURL 환경변수는 .env에 VITE_API_URL로 지정!
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 예: "http://3.36.55.255:8080"
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  // token이 없어도 undefined 처리 (문제 없음)
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // 혹시 로그아웃 함수가 없는 상황(아직 미구현)도 대비
    if (err.response?.status === 401) {
      const logout = useAuthStore.getState().logout;
      if (logout) logout();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
