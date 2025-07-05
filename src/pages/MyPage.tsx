import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyInfo } from "../apis/user";
import type { UserInfo } from "../apis/user";
const profileImg =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=128&q=80";

const fundings = [
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=300&q=80",
];

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyInfo()
      .then(setUser)
      .catch(e => {
        alert(e.message || "내 정보를 불러오지 못했습니다.");
      })
      .finally(() => setLoading(false));
  }, []);

  // 나이 계산 함수
  const getAge = (birth: string) => {
    if (!birth) return "-";
    const today = new Date();
    const birthDate = new Date(birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleLogout = () => {
    // 로그아웃 처리
    // localStorage.clear(); // 필요 시
    navigate("/login");
  };

  const handleWithdraw = () => {
    const confirmed = window.confirm("정말 탈퇴하시겠습니까?");
    if (confirmed) {
      navigate("/goodbye");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-gray-400">로딩 중...</span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pt-6 pb-4 px-4">
      {/* 상단 타이틀 */}
      <div className="text-center font-bold text-xl mb-6">마이 페이지</div>

      {/* 프로필 카드 */}
      <div className="flex items-center mb-6">
        {/* 프로필 사진 (실제 이미지 url 나오면 user.profileImage로 교체!) */}
        <img
          src={profileImg}
          alt="프로필"
          className="w-14 h-14 rounded-full object-cover border mr-3"
        />
        <div className="flex-1">
          <div className="font-bold text-[19px] leading-tight">
            {user?.name ?? "-"}
          </div>
          <div className="text-[#7B977F] text-[15px]">
            {user?.birth ? `${getAge(user.birth)}세` : "-"}
            {user?.regionName ? ` · ${user.regionName} 거주` : ""}
          </div>
        </div>
        <button
          className="bg-[#538E79] text-white text-sm font-medium px-4 py-2 rounded-lg"
          onClick={() => navigate("/edit-profile")}
        >
          프로필 수정
        </button>
      </div>

      {/* 펀딩 목록 */}
      <div className="mb-5">
        <div
          className="flex justify-between items-center mb-3 cursor-pointer"
          onClick={() => navigate("/my-fundings")}
        >
          <span className="font-bold text-base">내가 참여한 펀딩 목록</span>
          <span className="text-2xl text-[#222]">{">"}</span>
        </div>
        <div className="flex gap-3 overflow-x-auto">
          {fundings.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`펀딩${i + 1}`}
              className="w-24 h-28 object-cover rounded-xl bg-gray-100"
            />
          ))}
        </div>
      </div>

      {/* 저장한 공고 조회 */}
      <div>
        <div
          className="flex justify-between items-center mb-5 cursor-pointer"
          onClick={() => navigate("/saved-posts")}
        >
          <span className="font-bold text-base">저장한 공고 조회</span>
          <span className="text-2xl text-[#222]">{">"}</span>
        </div>
        <hr className="my-3 border-gray-300" />
      </div>

      {/* 기타 */}
      <div>
        <div className="font-bold mb-3 text-base">기타</div>
        <div
          className="text-gray-700 mb-2 cursor-pointer"
          onClick={handleLogout}
        >
          로그아웃
        </div>
        <div
          className="text-gray-700 cursor-pointer"
          onClick={handleWithdraw}
        >
          회원탈퇴
        </div>
      </div>
    </div>
  );
};

export default MyPage;
