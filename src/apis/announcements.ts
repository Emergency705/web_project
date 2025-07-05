import api from "./index";

// API에서 내려주는 Announcement 타입
export interface Announcement {
  id: number;
  infoType: string;   // 공고 유형
  region: string;
  target: string;
  remainPeriod: number;  // 남은 기간
  title: string;
  institute: string;
  openDate: string;
}

interface AnnouncementsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Announcement[];
}

/**
 * 공고 리스트 조회 API
 * @param params: type(필수), isRecruiting, region, target
 */
export const fetchAnnouncements = async (params: {
  type: string; // 예: "HOUSE"
  isRecruiting?: boolean;
  region?: string;
  target?: string;
}) => {
  const { data } = await api.get<AnnouncementsResponse>("/announcements/", {
    params,
  });
  return data.result;
};
