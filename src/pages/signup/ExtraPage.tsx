import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

const DISABILITY_TYPES = [
  "지적장애",
  "청각장애",
  "시각장애",
  "뇌병변장애",
  "언어장애",
  "안면장애",
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

const schema = z.object({
  region: z.string().min(1, "지역을 입력해주세요."),
  disabilityLevel: z.string().min(1, "장애 정도를 선택해주세요."),
  disabilityType: z
    .array(z.string())
    .min(1, "장애 유형을 하나 이상 선택해주세요."),
});

type FormData = z.infer<typeof schema>;

const ExtraPage = () => {
  const navigate = useNavigate();
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      disabilityType: [],
    },
  });

  const selectedDisabilityTypes = watch("disabilityType");

  const handleDisabilityTypeToggle = (type: string) => {
    const currentTypes = selectedDisabilityTypes || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];
    setValue("disabilityType", newTypes, { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    navigate("/signup/complete");
  };

  const Chip = ({
    text,
    isSelected,
    onClick,
  }: {
    text: string;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full border transition-colors ${
        isSelected
          ? "bg-[#EAF0ED] border-[#538E79] text-[#538E79] font-semibold"
          : "bg-white border-gray-300 text-gray-700"
      }`}
    >
      {text}
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <label className="text-sm font-semibold mb-2 block">
              어느 지역에 살고 계세요?
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                className={`w-full p-3 border rounded-md focus:outline-none flex justify-between items-center text-left ${
                  errors.region ? "border-red-500" : "border-gray-300"
                }`}
              >
                <span
                  className={watch("region") ? "text-black" : "text-gray-400"}
                >
                  {watch("region") || "지역을 선택하세요"}
                </span>
                <IoIosArrowDown
                  className={`transition-transform ${
                    isRegionDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isRegionDropdownOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {KOREAN_REGIONS.map((region) => (
                    <li
                      key={region}
                      onClick={() => {
                        setValue("region", region, { shouldValidate: true });
                        setIsRegionDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {region}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {errors.region && (
              <p className="text-red-500 text-xs mt-1">
                {errors.region.message}
              </p>
            )}
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
                    text="심함"
                    isSelected={watch("disabilityLevel") === "심함"}
                    onClick={() =>
                      setValue("disabilityLevel", "심함", {
                        shouldValidate: true,
                      })
                    }
                  />
                  <Chip
                    text="심하지 않음"
                    isSelected={watch("disabilityLevel") === "심하지 않음"}
                    onClick={() =>
                      setValue("disabilityLevel", "심하지 않음", {
                        shouldValidate: true,
                      })
                    }
                  />
                </div>
                {errors.disabilityLevel && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.disabilityLevel.message}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium mb-2 text-gray-800">
                  장애 유형 (중복 선택 가능)
                </p>
                <div className="flex flex-wrap gap-2">
                  {DISABILITY_TYPES.map((type) => (
                    <Chip
                      key={type}
                      text={type}
                      isSelected={selectedDisabilityTypes.includes(type)}
                      onClick={() => handleDisabilityTypeToggle(type)}
                    />
                  ))}
                </div>
                {errors.disabilityType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.disabilityType.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
          className={`w-full text-white py-3 rounded-md transition-colors ${
            isValid
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
