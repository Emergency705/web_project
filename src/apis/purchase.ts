import api from "./axios";

// --- 타입 정의 ---

// API 응답을 위한 제네릭 타입
interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// 아래는 API 응답을 기반으로 한 최종 타입입니다.
export interface Seller {
  id: number;
  name: string;
}

export interface Review {
  id: number;
  name: string;
  content: string;
  // TODO: 백엔드 응답에 profileImageUrl, quantity 등이 추가될 수 있는지 확인 필요
  profileImageUrl?: string;
  quantity?: number;
}

export interface FundingItem {
  itemId: number;
  name: string;
  description: string;
  imageUrl?: string; // 상세 조회 응답 필드
  image?: string; // 목록 조회 응답 필드
  startPrice?: number;
  maxPrice?: number;
  placeType: string; // "BATHROOM" 등
  closedDate?: string; // "2025-07-14"
  currentCount: number;
  maxCount?: number;
  currentPrice: number;
  seller?: Seller;
  reviews?: Review[];
}

// 구매 등록 (POST /funding/{itemId}) 요청 타입
export interface CreateFundingRequest {
  itemId: number;
  count: number;
}

// 기대평 등록 (POST /review) 요청 타입
export interface CreateReviewRequest {
  itemId: number;
  content: string;
}

// --- API 요청 함수 ---

/**
 * 전체 구매 목록 조회 API
 * @returns Promise<FundingItem[]>
 */
export const getFundingList = async (): Promise<FundingItem[]> => {
  const response = await api.get<ApiResponse<FundingItem[]>>("/funding/");
  return response.data.result;
};

/**
 * 내 펀딩 목록 조회 API
 * @returns Promise<FundingItem[]>
 */
export const getMyFundingList = async (): Promise<FundingItem[]> => {
  const response = await api.get<ApiResponse<FundingItem[]>>("/funding/user");
  return response.data.result;
};

/**
 * 구매 상세 정보 조회 API
 * @param itemId 상품 ID
 * @returns Promise<FundingItem>
 */
export const getFundingDetail = async (
  itemId: number
): Promise<FundingItem> => {
  const response = await api.get<ApiResponse<FundingItem>>(
    `/funding/${itemId}`
  );
  return response.data.result;
};

/**
 * 구매 등록(참여) API
 * @param data { itemId, count }
 */
export const createFunding = async (data: CreateFundingRequest) => {
  // Swagger 명세와 달리, itemId는 URL 경로로만 전달하고, count만 쿼리로 전달합니다.
  // 서버에서 중복된 itemId로 인해 500 오류가 발생하는 것을 방지하기 위함입니다.
  const { itemId, count } = data;
  const response = await api.post<ApiResponse<object>>(
    `/funding/${itemId}`,
    null,
    {
      params: {
        count,
      },
    }
  );
  return response.data;
};

/**
 * 구매 의사 취소 API
 * @param itemId 상품 ID
 */
export const deleteFunding = async (itemId: number) => {
  const response = await api.delete<ApiResponse<object>>(`/funding/${itemId}`);
  return response.data;
};

/**
 * 기대평 등록 API
 * @param data { itemId, content }
 */
export const createReview = async (data: CreateReviewRequest) => {
  const response = await api.post<ApiResponse<object>>("/review", null, {
    params: data,
  });
  return response.data;
};
