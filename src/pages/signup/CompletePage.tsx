import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useSignupStore } from "../../stores/signup";

const CompletePage = () => {
  const navigate = useNavigate();
  const resetSignupStore = useSignupStore((state) => state.reset);

  const handleNavigateToLogin = () => {
    resetSignupStore();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto p-6 justify-between">
      <div />
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full"></div>
          <IoCheckmarkCircleOutline className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl text-[#538E79]" />
        </div>
        <h1 className="text-2xl font-bold">축하합니다!</h1>
        <p className="text-gray-600 mt-2">가입을 완료했어요</p>
      </div>

      <div className="w-full">
        <button
          onClick={handleNavigateToLogin}
          className="w-full text-white py-3 rounded-md bg-[#538E79] hover:bg-opacity-90 transition-colors"
        >
          로그인하고 시작하기
        </button>
      </div>
    </div>
  );
};

export default CompletePage;
