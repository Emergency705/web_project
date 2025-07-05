import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useSignupStore } from "../../stores/signup";
import { signup } from "../../apis/auth";

const DISABILITY_TYPES = [
  "지적장애",
  "청각장애",
  "시각장애",
  "뇌병변장애",
  "언어장애",
  "안면장애",
  "자폐성장애",
  "정신장애",
  "제주특별자치도",
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
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

  const handleDisabilityTypeChange = (type: string) => {
    const newTypes = signupData.disabilityType.includes(type)
      ? signupData.disabilityType.filter((t) => t !== type)
      : [...signupData.disabilityType, type];
    signupData.updateFormData({ disabilityType: newTypes });
  };

  const handleSubmit = async () => {
    // 1. 스토어에서 모든 회원가입 데이터를 가져옵니다.
    const {
      name,
      userId,
      password,
      birthDate,
      disabilityLevel,
      disabilityType,
      region,
    } = signupData;

    // 2. API가 요구하는 형식으로 데이터를 변환합니다.
    // TODO: 백엔드와 협의하여 정확한 regionId 매핑 테이블을 적용해야 합니다.
    const regionId = KOREAN_REGIONS.indexOf(region);

    // TODO: 백엔드와 협의하여 정확한 disableType 코드 규칙을 적용해야 합니다.
    // 현재: 장애 유형(disabilityType) 또는 장애 정도(disabilityLevel)가 하나라도 선택된 경우 "A"로 설정
    const disableType = disabilityType.length > 0 || disabilityLevel ? "A" : "";

    // 3. API 요청 객체를 생성합니다.
    const signupRequest = {
      name,
      loginId: userId,
      password,
      birth: birthDate,
      disableType,
      regionId,
    };

    try {
      // 디버깅을 위해 API 요청 직전에 전송될 데이터를 콘솔에 출력합니다.
      console.log("회원가입 요청 데이터:", signupRequest);

      // 4. 회원가입 API를 호출합니다.
      await signup(signupRequest);
      // 5. 성공 시 완료 페이지로 이동합니다.
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-8"
        >
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
                        signupData.updateFormData({ region: r });
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
              본인의 장애 종류를 체크해주세요.
            </label>
            <p className="text-xs text-gray-500 mb-2">
              공식적인 기준을 따라서 체크해주세요!
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2 text-gray-800">
                  장애 정도
                </p>
                <div className="flex gap-2">
                  <Chip
                    label="심함"
                    isSelected={signupData.disabilityLevel === "심함"}
                    onClick={() =>
                      signupData.updateFormData({ disabilityLevel: "심함" })
                    }
                  />
                  <Chip
                    label="심하지 않음"
                    isSelected={signupData.disabilityLevel === "심하지 않음"}
                    onClick={() =>
                      signupData.updateFormData({
                        disabilityLevel: "심하지 않음",
                      })
                    }
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
                      isSelected={signupData.disabilityType.includes(type)}
                      onClick={() => handleDisabilityTypeChange(type)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full text-white py-3 rounded-md bg-[#538E79] hover:bg-opacity-90"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default ExtraPage;
