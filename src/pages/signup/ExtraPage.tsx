import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useSignupStore } from "../../stores/signup";

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
  const { region, disabilityLevel, disabilityType, updateFormData } =
    useSignupStore();
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

  const handleDisabilityTypeChange = (type: string) => {
    const newTypes = disabilityType.includes(type)
      ? disabilityType.filter((t) => t !== type)
      : [...disabilityType, type];
    updateFormData({ disabilityType: newTypes });
  };

  const handleSubmit = () => {
    // 데이터는 이미 Chip과 Dropdown을 통해 실시간으로 스토어에 업데이트됨
    // 여기서는 페이지 이동만 처리
    navigate("/signup/complete");
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

        <form onSubmit={handleSubmit} className="space-y-8">
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
                <span className={region ? "text-black" : "text-gray-400"}>
                  {region || "지역을 선택하세요"}
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
                    isSelected={disabilityLevel === "심함"}
                    onClick={() => updateFormData({ disabilityLevel: "심함" })}
                  />
                  <Chip
                    label="심하지 않음"
                    isSelected={disabilityLevel === "심하지 않음"}
                    onClick={() =>
                      updateFormData({ disabilityLevel: "심하지 않음" })
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
                      isSelected={disabilityType.includes(type)}
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
