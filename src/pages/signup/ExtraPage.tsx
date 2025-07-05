import { useNavigate } from "react-router-dom";
import { useSignupStore } from "../../stores/signup";
import { IoIosArrowBack } from "react-icons/io";

const ExtraPage = () => {
  const navigate = useNavigate();
  const { region, disabilityLevel, disabilityType, updateFormData } =
    useSignupStore();

  const handleDisabilityTypeChange = (type: string) => {
    const newTypes = disabilityType.includes(type)
      ? disabilityType.filter((t) => t !== type)
      : [...disabilityType, type];
    updateFormData({ disabilityType: newTypes });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 데이터는 이미 Chip과 Dropdown을 통해 실시간으로 스토어에 업데이트됨
    // 여기서는 페이지 이동만 처리
    navigate("/signup/complete");
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto p-6">
      <header className="mb-8">
        <button onClick={() => navigate(-1)} className="p-1">
          <IoIosArrowBack size={24} />
        </button>
      </header>
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-2">드디어 마지막 단계예요.</h1>
        <h1 className="text-2xl font-bold mb-8">
          좀 더 자세한 정보가 필요해요!
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 지역 */}
          <div>
            <label className="font-bold text-gray-700">
              어느 지역에 살고 계세요?
            </label>
            <input
              type="text"
              value={region}
              onChange={(e) => updateFormData({ region: e.target.value })}
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#538E79]"
              placeholder="예: 서울특별시"
            />
          </div>

          {/* 장애 정도 */}
          <div>
            <label className="font-bold text-gray-700">
              본인의 장애 정도를 체크해주세요.
            </label>
            <p className="text-sm text-gray-500 mb-2">
              공식적인 기준을 따라서 체크해주세요.
            </p>
            <div className="flex space-x-2">
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

          {/* 장애 유형 */}
          <div>
            <label className="font-bold text-gray-700">
              장애 유형 (중복 선택 가능)
            </label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                "지체장애",
                "시각장애",
                "뇌병변장애",
                "언어장애",
                "안면장애",
                "자폐성장애",
                "정신장애",
              ].map((type) => (
                <Chip
                  key={type}
                  label={type}
                  isSelected={disabilityType.includes(type)}
                  onClick={() => handleDisabilityTypeChange(type)}
                />
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full text-white py-3 rounded-md bg-[#538E79] hover:bg-opacity-90"
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
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
    className={`px-4 py-2 rounded-full border transition-colors text-sm w-full ${
      isSelected
        ? "bg-[#538E79] text-white border-[#538E79]"
        : "bg-white text-gray-700 border-gray-300"
    }`}
  >
    {label}
  </button>
);

export default ExtraPage;
