import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useSignupStore } from "../../stores/signup";
import { signup } from "../../apis/auth";
import type { SignupRequest } from "../../apis/auth";

const DISABILITY_TYPES = [
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

const KOREAN_REGIONS = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

const ExtraPage = () => {
  const navigate = useNavigate();
  const signupData = useSignupStore((state) => state);
  const { updateFormData } = signupData;

  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

  const handleDisabilityTypeChange = (type: string) => {
    const typeIndex = DISABILITY_TYPES.indexOf(type);
    if (typeIndex === -1) return;

    const newTypes = signupData.disabilityTypes.includes(typeIndex)
      ? signupData.disabilityTypes.filter((t) => t !== typeIndex)
      : [...signupData.disabilityTypes, typeIndex];
    updateFormData({ disabilityTypes: newTypes });
  };

  const handleSubmit = async () => {
    const {
      name,
      userId,
      password,
      birthDate,
      region,
      isDisabled,
      disabilityLevel,
      disabilityTypes,
    } = signupData;

    // 비장애인 선택 시, 장애 관련 데이터는 null 또는 빈 배열로 설정
    const finalDisabilityLevel = isDisabled ? disabilityLevel : null;
    const finalDisabilityTypes = isDisabled ? disabilityTypes : [];

    const regionId = KOREAN_REGIONS.indexOf(region);

    const signupRequest: SignupRequest = {
      name,
      loginId: userId,
      password,
      birth: birthDate,
      regionId: regionId !== -1 ? regionId : 0, // 기본값(서울)
      disabilityLevel: finalDisabilityLevel,
      disabilityTypes: finalDisabilityTypes,
    };

    console.log("회원가입 요청 데이터:", signupRequest);

    try {
      await signup(signupRequest);
      navigate("/signup/complete");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const Chip = ({
    label,
    isSelected,
    onClick,
  }: {
    label: string;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full border transition-colors ${
        isSelected
          ? "bg-[#538E79] text-white border-[#538E79]"
          : "bg-white text-gray-700 border-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto p-6">
      <header className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-1">
          <IoIosArrowBack size={24} />
        </button>
      </header>

      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-2">드디어 마지막 단계예요</h1>
        <h2 className="text-2xl font-bold mb-8">
          좀 더 자세한 정보가 필요해요!
        </h2>

        <div className="space-y-8">
          <div>
            <label className="text-sm font-semibold mb-2 block">
              어느 지역에 살고 계세요?
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRegionDropdownOpen((prev) => !prev)}
                className="w-full p-3 border rounded-md focus:outline-none flex justify-between items-center text-left border-gray-300"
              >
                <span
                  className={signupData.region ? "text-black" : "text-gray-400"}
                >
                  {signupData.region || "지역을 선택하세요"}
                </span>
                <IoIosArrowDown
                  className={`transition-transform ${
                    isRegionDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isRegionDropdownOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {KOREAN_REGIONS.map((r) => (
                    <li
                      key={r}
                      onClick={() => {
                        updateFormData({ region: r });
                        setIsRegionDropdownOpen(false);
                      }}
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              장애 여부를 선택해주세요.
            </label>
            <div className="flex gap-2">
              <Chip
                label="장애인입니다"
                isSelected={signupData.isDisabled === true}
                onClick={() => updateFormData({ isDisabled: true })}
              />
              <Chip
                label="비장애인입니다"
                isSelected={signupData.isDisabled === false}
                onClick={() => updateFormData({ isDisabled: false })}
              />
            </div>
          </div>

          {/* 장애인입니다'를 선택했을 때만 보이는 섹션 */}
          {signupData.isDisabled === true && (
            <>
              <div>
                <p className="text-sm font-medium mb-2 text-gray-800">
                  장애 정도
                </p>
                <div className="flex gap-2">
                  <Chip
                    label="심함"
                    isSelected={signupData.disabilityLevel === 1}
                    onClick={() => updateFormData({ disabilityLevel: 1 })}
                  />
                  <Chip
                    label="심하지 않음"
                    isSelected={signupData.disabilityLevel === 0}
                    onClick={() => updateFormData({ disabilityLevel: 0 })}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2 text-gray-800">
                  장애 유형 (중복 선택 가능)
                </p>
                <div className="flex flex-wrap gap-2">
                  {DISABILITY_TYPES.map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      isSelected={signupData.disabilityTypes.includes(
                        DISABILITY_TYPES.indexOf(type)
                      )}
                      onClick={() => handleDisabilityTypeChange(type)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSubmit}
          disabled={signupData.isDisabled === null} // 장애 여부를 선택해야 활성화
          className={`w-full text-white py-3 rounded-md transition-colors ${
            signupData.isDisabled !== null
              ? "bg-[#538E79] hover:bg-opacity-90"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default ExtraPage;
