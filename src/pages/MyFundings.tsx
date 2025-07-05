import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/backButton.svg';
const sampleFundings = [
  {
    id: 1,
    title: '욕실 미끄럼 방지 매트',
    price: 12000,
    quantity: 3,
    deadline: '3일 뒤 구매 마감',
    imageUrl: '/assets/mat.jpg', // 이미지 경로 확인 필요
  },
  {
    id: 2,
    title: '욕실 미끄럼 방지 매트',
    price: 12000,
    quantity: 3,
    deadline: '3일 뒤 구매 마감',
    imageUrl: '/assets/mat.jpg',
  },
  {
    id: 3,
    title: '욕실 미끄럼 방지 매트',
    price: 12000,
    quantity: 3,
    deadline: '3일 뒤 구매 마감',
    imageUrl: '/assets/mat.jpg',
  },
];

const MyFundings = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto px-4 py-5 bg-white min-h-screen">
      {/* 상단 바 */}
      <div className="relative mb-5 text-center">
        <button onClick={() => navigate(-1)} className="absolute left-0 pl-2 ">
            <img src={backIcon} alt="뒤로가기" className="w-6 h-6" />
        </button>

        <h1 className="text-2xl font-bold">내가 참여한 펀딩 목록</h1>
      </div>

      {/* 펀딩 목록 */}
      <div className="space-y-6">
        {sampleFundings.map((item) => (
          <div key={item.id} className="bg-white rounded-lg  p-3">
            <div className="flex gap-4">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-28 h-28 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="text-red-500 text-sm font-semibold mt-1">{item.deadline}</p>
                <p className="font-semibold text-base">{item.title}</p>
                <p className="font-semibold text-sm mt-2">
                  현재 가격: {item.price.toLocaleString()}원
                </p>
                <p className="text-sm text-gray-700">
                  내 수량: {item.quantity}개
                </p>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-2 mt-3">
              <button
                className="flex-1 bg-[#8DE1D1] text-black py-1.5 rounded-md font-semibold"
                onClick={() => navigate(`/write-review/${item.id}`)}
              >
                기대평 남기기
              </button>
              <button
                className="flex-1 bg-[#DDDDDD] text-black py-1.5 rounded-md font-semibold"
                onClick={() => alert('등록 수정 기능은 준비 중입니다.')}
              >
                내 등록 수정
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFundings;
