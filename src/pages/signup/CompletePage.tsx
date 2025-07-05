import { useNavigate } from "react-router-dom";
import CompleteIcon from "../../assets/completePage-icon.svg";

const CompletePage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto p-6">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <div className="w-40 h-40 rounded-full bg-[#EAF0ED] flex items-center justify-center mb-8">
          <img
            src={CompleteIcon}
            alt="가입 완료 아이콘"
            className="w-24 h-auto"
          />
        </div>
        <h1 className="text-2xl font-bold">축하합니다!</h1>
        <p className="text-2xl font-bold">가입을 완료했어요</p>
      </div>

      <div className="mt-8 mb-4">
        <button
          onClick={handleStartClick}
          className="w-full bg-[#538E79] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors"
        >
          로그인하고 시작하기
        </button>
      </div>
    </div>
  );
};

export default CompletePage;
