import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoIosArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

const schema = z.object({
  profileImage: z.any().optional(), // 이미지 파일은 zod로 복잡하게 검증하기보다, onSubmit에서 직접 처리하는 것이 용이
  birthDate: z.string().min(1, "생년월일을 입력해주세요."),
});

type FormData = z.infer<typeof schema>;

const ProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log({ ...data, profileImage: previewImage });
    navigate("/signup/extra");
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
          프로필 사진과 생일을 설정해주세요
        </h1>

        <div className="flex justify-center mb-12">
          <div className="relative">
            <div
              className="w-40 h-40 rounded-full bg-[#EAF0ED] flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={handleImageUploadClick}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="프로필 미리보기"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">사진 추가</span>
              )}
            </div>
            <button
              onClick={handleImageUploadClick}
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <MdEdit className="text-[#538E79]" size={20} />
            </button>
            <Controller
              name="profileImage"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    handleFileChange(e);
                    field.onChange(e.target.files?.[0]);
                  }}
                  className="hidden"
                  accept="image/*"
                />
              )}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-semibold mb-2 block">
              생년월일을 알려주세요!
            </label>
            <div className="relative">
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#538E79]"
                  />
                )}
              />
              <FaCalendarAlt className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
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
          다음
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
