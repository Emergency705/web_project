// src/pages/EditProfile.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="max-w-md mx-auto p-4 text-sm">
      {/* 뒤로가기 */}
      <button onClick={() => navigate(-1)} className="text-2xl mb-4">{'<'}</button>

      {/* 프로필 이미지 */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-20 h-20 rounded-full bg-black overflow-hidden">
          {profileImage && <img src={profileImage} alt="profile" className="w-full h-full object-cover" />}
        </div>
        <div className="flex flex-col gap-2">
          <label className="bg-gray-800 text-white px-3 py-1 rounded-md cursor-pointer">
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
            className="border px-3 py-1 rounded-md text-gray-500"
          >
            기본 이미지
          </button>
        </div>
      </div>

      {/* 이름 */}
      <label className="block mb-1 font-medium">사용자 이름</label>
      <input
        type="text"
        className="w-full border rounded-md p-2 mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* 지역 */}
      <label className="block mb-1 font-medium">거주 지역</label>
      <select
        className="w-full border rounded-md p-2 mb-4"
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
      <label className="block mb-1 font-medium">생년월일을 알려주세요!</label>
      <input
        type="date"
        className="w-full border rounded-md p-2 mb-6"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
      />

      {/* 장애 유형 */}
      <div className="mb-2 font-medium">본인의 장애 종류를 체크해주세요.</div>
      <p className="text-gray-500 text-xs mb-2">공식적인 기준을 따라서 체크해주세요!</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {disabilityTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeToggle(type)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selectedTypes.includes(type)
                ? 'bg-green-200 border-green-500 text-black'
                : 'bg-white text-gray-600'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 장애 정도 */}
      <div className="flex gap-2 mb-6">
        {disabilityLevels.map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selectedLevel === level
                ? 'bg-green-200 border-green-500 text-black'
                : 'bg-white text-gray-600'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
        className="w-full bg-gray-800 text-white py-2 rounded-md"
      >
        수정사항 저장
      </button>
    </div>
  );
};

export default EditProfile;
