import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
import Logo from "../assets/logo_시소.svg";
import { useAuthStore } from "../stores/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuthStore();

  // [DEV] 임시 로그인: 백엔드 API 연동 전 임시 로그인 처리를 위한 함수입니다.
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // [DEV] 임시 로그인: 'test' / '1234'로 로그인 시도
    if (username === "test" && password === "1234") {
      const fakeToken = "fake-jwt-token-for-dev"; // 임시 토큰
      // [DEV] 임시 로그인: Zustand 스토어에 임시 토큰 저장
      setToken(fakeToken);
      navigate("/home"); // 로그인 성공 시 홈으로 이동
      return;
    }

    // [TODO] 추후 실제 백엔드 로그인 로직으로 교체해야 합니다.
    try {
      console.log("실제 로그인 로직 필요");
      // 예: const response = await login(username, password);
      // setToken(response.token);
      // navigate("/home");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  const handleSignupClick = () => {
    navigate("/signup/terms");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-8">
      <img src={Logo} alt="시소 로고" className="w-28 h-auto mb-12" />

      {/* [DEV] 임시 로그인: handleLogin 함수를 form의 onSubmit 이벤트에 연결 */}
      <form className="w-full max-w-sm" onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            // [DEV] 임시 로그인: username 상태와 input 값을 동기화
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#538E79]"
          />
        </div>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요."
            // [DEV] 임시 로그인: password 상태와 input 값을 동기화
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
