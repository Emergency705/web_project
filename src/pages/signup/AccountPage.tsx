import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoIosArrowBack } from "react-icons/io";

const schema = z
  .object({
    userId: z.string().min(1, "아이디를 입력해주세요."),
    password: z
      .string()
      .min(8, "영문/숫자/특수기호 조합 8자 이상 입력해주세요."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"], // 에러 메시지를 표시할 필드
  });

type FormData = z.infer<typeof schema>;

const AccountPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange", // 입력값이 변경될 때마다 유효성 검사
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    navigate("/signup/profile");
  };

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto p-6">
      <header className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-1">
          <IoIosArrowBack size={24} />
        </button>
      </header>

      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-8">
          앱에 들어올 때<br />
          사용할 계정 정보를 설정해주세요
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="text-sm font-semibold mb-2 block">
              사용자 아이디
            </label>
            <div className="relative">
              <input
                {...register("userId")}
                placeholder="프로필에 노출되며, 추후 변경 가능해요!"
                className={`w-full p-3 pr-24 border rounded-md focus:outline-none ${
                  errors.userId
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-[#538E79]"
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-1 right-1 bg-[#538E79] text-white text-xs px-3 rounded-md"
              >
                중복체크
              </button>
            </div>
            {errors.userId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.userId.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">비밀번호</label>
            <input
              type="password"
              {...register("password")}
              placeholder="영문/숫자/특수기호 조합 8자 이상"
              className={`w-full p-3 border rounded-md focus:outline-none ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-[#538E79]"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              비밀번호 재입력
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="비밀번호를 다시 입력해주세요."
              className={`w-full p-3 border rounded-md focus:outline-none ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-[#538E79]"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
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
          다음
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
