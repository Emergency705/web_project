import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmark } from "react-icons/io5";

const TermsPage = () => {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState({
    all: false,
    termsOfService: false,
    privacyPolicy: false,
    age: false,
    marketing: false,
    push: false,
  });

  const { all, termsOfService, privacyPolicy, age, marketing, push } =
    agreements;
  const requiredAgreed = termsOfService && privacyPolicy && age;

  useEffect(() => {
    // 모든 개별 동의 항목(선택 포함)이 변경될 때 '전체 동의' 상태를 업데이트
    const allIndividualAgreed =
      termsOfService && privacyPolicy && age && marketing && push;
    if (all !== allIndividualAgreed) {
      setAgreements((prev) => ({ ...prev, all: allIndividualAgreed }));
    }
  }, [termsOfService, privacyPolicy, age, marketing, push, all]);

  const handleCheckboxChange = (name: keyof typeof agreements) => {
    if (name === "all") {
      const newValue = !all;
      setAgreements({
        all: newValue,
        termsOfService: newValue,
        privacyPolicy: newValue,
        age: newValue,
        marketing: newValue,
        push: newValue,
      });
    } else {
      setAgreements((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    }
  };

  const Checkbox = ({
    id,
    checked,
    label,
    isRequired,
    hasView = false,
  }: {
    id: keyof typeof agreements;
    checked: boolean;
    label: string;
    isRequired: boolean;
    hasView?: boolean;
  }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={() => handleCheckboxChange(id)}
          className={`w-5 h-5 rounded-sm flex items-center justify-center mr-3 transition-colors ${
            checked ? "bg-[#D9E4E0]" : "bg-gray-200"
          }`}
        >
          {checked && <IoCheckmark className="text-[#538E79]" />}
        </button>
        <label htmlFor={id} className="text-gray-800">
          <span className={isRequired ? "font-bold" : ""}>{`[${
            isRequired ? "필수" : "선택"
          }]`}</span>{" "}
          {label}
        </label>
      </div>
      {hasView && (
        <a href="#" className="text-sm text-gray-500 hover:underline">
          보기
        </a>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto p-6">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-8">
          서비스 이용을 위해
          <br />
          약관에 동의해주세요
        </h1>

        <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
          <button
            onClick={() => handleCheckboxChange("all")}
            className={`w-6 h-6 rounded-md flex items-center justify-center mr-4 transition-colors ${
              all ? "bg-[#D9E4E0]" : "bg-gray-200"
            }`}
          >
            {all && <IoCheckmark size={20} className="text-[#538E79]" />}
          </button>
          <label htmlFor="all" className="text-lg font-bold text-gray-900">
            전체 약관에 동의합니다
          </label>
        </div>

        <div className="space-y-4">
          <Checkbox
            id="termsOfService"
            checked={termsOfService}
            label="서비스 이용약관 동의"
            isRequired={true}
            hasView={true}
          />
          <Checkbox
            id="privacyPolicy"
            checked={privacyPolicy}
            label="개인정보 처리방침 동의"
            isRequired={true}
            hasView={true}
          />
          <Checkbox
            id="age"
            checked={age}
            label="만 14세 이상입니다"
            isRequired={true}
          />
          <Checkbox
            id="marketing"
            checked={marketing}
            label="마케팅 정보 수신 동의"
            isRequired={false}
            hasView={true}
          />
          <Checkbox
            id="push"
            checked={push}
            label="푸시 알림 수신 동의"
            isRequired={false}
          />
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs text-gray-600 space-y-2">
          <p>안전한 커피챗을 위한 조치</p>
          <ul className="list-disc list-inside">
            <li>실명과 학교 인증이 완료된 사용자만 이용 가능</li>
            <li>부적절한 행동 시 서비스 이용이 제한될 수 있음</li>
            <li>개인정보 보호를 위해 연락처는 자동으로 공유되지 않음</li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => navigate("/signup/account")}
          disabled={!requiredAgreed}
          className={`w-full text-white py-3 rounded-md transition-colors ${
            requiredAgreed
              ? "bg-[#538E79] hover:bg-opacity-90"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          동의하고 계속하기
        </button>
      </div>
    </div>
  );
};

export default TermsPage;
