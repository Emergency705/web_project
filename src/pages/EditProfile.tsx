import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/backButton.svg";
import { FiImage } from "react-icons/fi";

const disabilityTypes = [
  "지체장애",
  "청각장애",
  "시각장애",
  "뇌병변장애",
  "언어장애",
  "안면장애",
  "지적장애",
  "자폐성장애",
  "정신장애",
];

const disabilityLevels = ["정도가 심함", "정도가 심하지 않음"];

const EditProfile = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImageMenu, setShowImageMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("김하은");
  const [region, setRegion] = useState("서울");
  const [birth, setBirth] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("");

  // 파일 인풋 onChange → 파일 받아서 이미지 적용!
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setShowImageMenu(false);
    // 파일 재선택 가능하도록 value 리셋
    e.target.value = "";
  };

  // 외부 클릭 시 팝오버 닫기
  React.useEffect(() => {
    if (!showImageMenu) return;
    const handler = (e: MouseEvent) => {
      const menu = document.getElementById("profile-image-menu");
      if (menu && !menu.contains(e.target as Node)) {
        setShowImageMenu(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [showImageMenu]);

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
    console.log("저장된 데이터:", data);
    navigate("/mypage");
  };

  return (
    <div className="max-w-[400px] mx-auto p-4 bg-white min-h-screen text-sm relative">
      {/* 뒤로가기 */}
      <button onClick={() => navigate(-1)} className="absolute left-4 top-4">
        <img src={backIcon} alt="뒤로가기" className="w-6 h-6" />
      </button>

      {/* 숨겨진 파일 인풋은 팝오버 바깥에 둬야 안정적으로 동작 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* 프로필 사진 중앙 정렬 */}
      <div className="flex flex-col items-center mt-14 mb-4 relative">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          {profileImage && (
            <img
              src={profileImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        {/* 갤러리 아이콘 (프로필 오른쪽 하단에 겹치게) */}
        <button
          type="button"
          className="absolute right-[calc(50%-48px)] bottom-0 translate-x-1/2 translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow cursor-pointer"
          onClick={() => setShowImageMenu((v) => !v)}
          aria-label="사진 선택 메뉴"
        >
          <FiImage className="w-6 h-6 text-gray-600" />
        </button>
        {/* 팝오버 메뉴 */}
        {showImageMenu && (
          <div
            id="profile-image-menu"
            className="absolute left-1/2 top-full mt-3 z-10 min-w-[160px] bg-white border border-gray-200 rounded-xl shadow-md p-2 flex flex-col"
            style={{ transform: "translateX(-50%)" }}
          >
            <button
              className={`text-[#649F87] font-medium flex items-center justify-between px-2 py-2 text-sm rounded hover:bg-gray-50 ${
                !profileImage ? "font-bold" : ""
              }`}
              onClick={() => {
                setProfileImage(null);
                setShowImageMenu(false);
              }}
            >
              기본 이미지
              {!profileImage && <span className="ml-2 text-lg">✓</span>}
            </button>
            <button
              className="text-gray-700 font-medium px-2 py-2 text-sm rounded hover:bg-gray-50 flex items-center"
              onClick={() => {
                setShowImageMenu(false);
                fileInputRef.current?.click();
              }}
            >
              앨범에서 선택
            </button>
          </div>
        )}
      </div>

      {/* 이름 */}
      <label className="block mb-1 font-bold text-base">사용자 이름</label>
      <input
        type="text"
        className="w-full border border-gray-300 p-2 mb-4 bg-white-50 text-base rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* 지역 */}
      <label className="block mb-1 font-bold text-base">거주 지역</label>
      <div className="relative mb-4">
        <select
          className="w-full border border-gray-300 p-2 pr-8 rounded-lg bg-white text-base appearance-none"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{ fontSize: "16px" }}
        >
          <option value="서울">서울</option>
          <option value="부산">부산</option>
          <option value="대구">대구</option>
          <option value="인천">인천</option>
          <option value="광주">광주</option>
        </select>
        {/* ▼ */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500">
          ▼
        </span>
      </div>

      {/* 생년월일 */}
      <label className="block mb-1 font-bold text-base">
        생년월일을 알려주세요!
      </label>
      <div className="relative mb-6">
        <input
          type="date"
          className="w-full border border-gray-300 p-2 rounded-lg bg-white-50 text-base appearance-none"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {/* 캘린더 아이콘 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          ></svg>
        </span>
      </div>

      {/* 장애 유형 */}
      <div className="mb-1 font-bold text-base">
        본인의 장애 종류를 체크해주세요.
      </div>
      <p className="text-gray-500 text-xs mb-1">
        공식적인 기준을 따라서 체크해주세요!
      </p>
      <p className="text-gray-500 text-xs mb-2">장애 유형 (중복 선택 가능)</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {disabilityTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handleTypeToggle(type)}
            className={`px-3 py-1 rounded-[10px] text-sm border font-medium
              ${
                selectedTypes.includes(type)
                  ? "bg-[#D3EDE4] border-[#538E79] text-[#538E79]"
                  : "bg-white border-[#538E79]-300 text-[#538E79]"
              }
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
              ${
                selectedLevel === level
                  ? "bg-[#D3EDE4] border-[#538E79] text-[#538E79]"
                  : "bg-white border-[#538E79]-300 text-[#538E79]"
              }
            `}
          >
            {level}
          </button>
        ))}
      </div>

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
        className="w-full bg-[#74947B] text-white py-3 rounded-md text-base font-bold"
      >
        수정사항 저장
      </button>
    </div>
  );
};

export default EditProfile;
