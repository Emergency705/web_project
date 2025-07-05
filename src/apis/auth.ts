import api from "./axios";

// --- 타입 정의 ---
// API 연동에 필요한 타입들을 정의합니다.
// 나중에 타입이 많아지면 src/apis/types.ts 같은 파일로 분리하는 것을 고려해볼 수 있습니다.

// 로그인 요청 (POST /login)
export interface LoginRequest {
  loginId: string;
  password: string;
}

// 로그인 응답 결과 (POST /login)
export interface LoginResult {
  memberId: number;
  accessToken: string;
}

// API 응답을 위한 제네릭 타입
interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// 회원가입 요청 (POST /users/join)
export interface SignupRequest {
  name: string; // TODO: 회원가입 폼에 이름 필드 추가 필요
  loginId: string;
  password: string;
  birth: string; // "YYYY-MM-DD"
  // TODO: API 명세 상 disableType은 "A"와 같은 단일 문자열이지만,
  // 회원가입 폼에서는 '장애 정도'와 '장애 유형'으로 나뉘어 있어 변환 규칙이 필요합니다.
  disableType: string;
  // TODO: API 명세 상 regionId는 숫자이지만,
  // 회원가입 폼에서는 "서울특별시"와 같은 지역 이름으로 되어 있어 ID로 변환이 필요합니다.
  regionId: number;
}

// 회원가입 응답 결과 (POST /users/join)
export interface SignupResult {
  userId: number;
  createdAt: string; // "2025-07-05T19:01:32.539Z"
}

// --- API 요청 함수 ---

/**
 * 로그인 API
 * @param data {loginId, password}
 * @returns Promise<LoginResult>
 */
export const login = async (data: LoginRequest): Promise<LoginResult> => {
  const response = await api.post<ApiResponse<LoginResult>>("/login", data);
  return response.data.result;
};

/**
 * 회원가입 API
 * @param data SignupRequest
 * @returns Promise<SignupResult>
 */
export const signup = async (data: SignupRequest): Promise<SignupResult> => {
  const response = await api.post<ApiResponse<SignupResult>>(
    "/users/join",
    data
  );
  return response.data.result;
};
