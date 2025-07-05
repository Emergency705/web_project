import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
import Logo from "../assets/logo_시소.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignupClick = () => {
    navigate("/signup/terms");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-8">
      <img src={Logo} alt="시소 로고" className="w-28 h-auto mb-12" />

      <form className="w-full max-w-sm">
        <div className="mb-4">
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#538E79]"
          />
        </div>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요."
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#538E79]"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>

        <div className="text-center mb-6">
          <a href="#" className="text-sm text-gray-500 hover:underline">
            비밀번호를 잊어버리셨나요?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-[#538E79] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors"
        >
          로그인
        </button>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-black">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={handleSignupClick}
          className="w-full bg-white text-black border border-[#538E79] py-3 rounded-md hover:bg-gray-50 transition-colors"
        >
          회원가입하기
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
