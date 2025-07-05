import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/backButton.svg';

const disabilityTypes = [
  '지체장애', '청각장애', '시각장애', '뇌병변장애',
  '언어장애', '안면장애', '지적장애', '자폐성장애', '정신장애',
];

const disabilityLevels = ['정도가 심함', '정도가 심하지 않음'];

const EditProfile = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('김하은');
  const [region, setRegion] = useState('서울');
  const [birth, setBirth] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSave = () => {
    const data = {
      name,
      region,
      birth,
      disabilityTypes: selectedTypes,
      disabilityLevel: selectedLevel,
      profileImage,
    };
    console.log('저장된 데이터:', data);
    navigate('/mypage');
  };

  return (
    <div className="max-w-[400px] mx-auto p-4 bg-white min-h-screen text-sm relative">
      {/* 뒤로가기 */}
      <button onClick={() => navigate(-1)} className="absolute left-4 top-4">
        <img src={backIcon} alt="뒤로가기" className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-4 mt-12 mb-6">
        {/* 프로필 이미지 */}
        <div className="w-20 h-20 rounded-full bg-black overflow-hidden mb-2 flex items-center justify-center">
          {profileImage && (
            <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
          )}
        </div>
        {/* 이미지 버튼 */}
        <div className="flex gap-2">
          <label className="bg-gray-800 text-white px-4 py-2  cursor-pointer text-xs font-medium text-center">
            앨범에서 선택
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <button
            onClick={() => setProfileImage(null)}
            className="border border-gray-300 px-4 py-2 text-gray-500 text-xs font-medium bg-white-100 text-center"
          >
            기본 이미지
          </button>
        </div>
      </div>

      {/* 이름 */}
      <label className="block mb-1 font-bold text-base">사용자 이름</label>
      <input
        type="text"
        className="w-full border border-gray-300 p-2 mb-4 bg-white-50 text-base"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* 지역 */}
      <label className="block mb-1 font-bold text-base">거주 지역</label>
      <select
        className="w-full border border-gray-300  p-2 mb-4 bg-white-50 text-base "
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        
      >
        <option value="서울">서울</option>
        <option value="부산">부산</option>
        <option value="대구">대구</option>
        <option value="인천">인천</option>
        <option value="광주">광주</option>
        {/* 필요에 따라 지역 추가 */}
      </select>

      {/* 생년월일 */}
      <label className="block mb-1 font-bold text-base">생년월일을 알려주세요!</label>
      <div className="relative mb-6">
        <input
          type="date"
          className="w-full border border-gray-300 p-2 bg-white-50 text-base"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {/* 캘린더 아이콘  */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            
          </svg>
        </span>
      </div>

      {/* 장애 유형 */}
      <div className="mb-1 font-bold text-base">본인의 장애 종류를 체크해주세요.</div>
      <p className="text-gray-500 text-xs mb-1">공식적인 기준을 따라서 체크해주세요!</p>
      <p className="text-gray-500 text-xs mb-2">장애 유형 (중복 선택 가능)</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {disabilityTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handleTypeToggle(type)}
            className={`px-3 py-1 rounded-[10px] text-sm border font-medium
              ${selectedTypes.includes(type)
                ? 'bg-[#8DE1D1] border-black-500 text-black-900'
                : 'bg-white border-gray-300 text-black-600'}
            `}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 장애 정도 */}
      <p className="text-gray-500 text-xs mb-1">장애 경도</p>
      <div className="flex gap-2 mb-8">
        {disabilityLevels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setSelectedLevel(level)}
            className={`px-3 py-1 rounded-[10px] text-sm border font-medium
              ${selectedLevel === level
                ? 'bg-[#8DE1D1] border-black-500 text-black-900'
                : 'bg-white border-gray-300 text-black-600'}
            `}
          >
            {level}
          </button>
        ))}
      </div>

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
        className="w-full bg-gray-800 text-white py-2 rounded-md text-base font-bold"
      >
        수정사항 저장
      </button>
    </div>
  );
};

export default EditProfile;
