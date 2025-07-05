import axios from "./axios";

export type UserInfo = {
  userId: number;
  name: string;
  loginId: string;
  birth: string;
  disableType: string;
  regionName: string;
};

export async function fetchMyInfo(): Promise<UserInfo> {
  const res = await axios.get("/users/info");
  if (!res.data.isSuccess) throw new Error(res.data.message || "유저 정보 불러오기 실패");
  return res.data.result as UserInfo;
}
