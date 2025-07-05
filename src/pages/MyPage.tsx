import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 여기에 실제 로그아웃 처리 (예: localStorage.clear())
    console.log('로그아웃 처리됨');
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleWithdraw = () => {
    const confirmed = window.confirm('정말 탈퇴하시겠습니까?');
    if (confirmed) {
      // 탈퇴 처리 로직 (예: API 호출)
      console.log('회원 탈퇴 처리됨');
      navigate('/goodbye'); // 탈퇴 완료 페이지로 이동
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 text-sm">
      {/* 프로필 카드 */}
      <div className="border rounded-xl p-4 flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full mb-2" />
        <div className="font-bold text-lg">김하은</div>
        <div className="text-gray-500">65세 · 서울 거주</div>
        <button
          className="mt-4 w-full bg-gray-800 text-white py-2 rounded-md"
          onClick={() => navigate('/edit-profile')}
        >
          프로필 수정
        </button>
      </div>

      {/* 내가 참여한 펀딩 목록 */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => navigate('/my-fundings')}
        >
          <span className="font-semibold">내가 참여한 펀딩 목록</span>
          <span className="text-xl">{'>'}</span>
        </div>
        <div className="flex gap-3 overflow-x-auto">
          <div className="w-24 h-28 bg-gray-200 rounded-lg" />
          <div className="w-24 h-28 bg-gray-200 rounded-lg" />
          <div className="w-24 h-28 bg-gray-200 rounded-lg" />
        </div>
      </div>

      {/* 저장한 공고 조회 */}
      <div className="border-t pt-4">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => navigate('/saved-posts')}
        >
          <span className="text-gray-700">저장한 공고 조회</span>
          <span className="text-xl">{'>'}</span>
        </div>

        {/* 로그아웃 / 회원탈퇴 */}
        <div
          className="text-gray-400 mb-2 cursor-pointer"
          onClick={handleLogout}
        >
          로그아웃
        </div>
        <div
          className="text-gray-400 cursor-pointer"
          onClick={handleWithdraw}
        >
          회원탈퇴
        </div>
      </div>
    </div>
  );
};

export default MyPage;


/*
const MyPage = () => {
  return <div>마이페이지</div>;
};
export default MyPage;
*/