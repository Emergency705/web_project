import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi'; // 뒤로가기 아이콘(react-icons 사용)

const dummyFundings: Record<number, { title: string }> = {
  1: {
    title: '욕실 미끄럼 방지 매트',
  },
  2: {
    title: '기타 펀딩 제품',
  },
};

const WriteReview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  const funding = dummyFundings[Number(id)];

  const handleSubmit = () => {
    console.log('작성한 기대평:', {
      productId: id,
      content,
    });
    alert('기대평이 저장되었습니다!');
    navigate('/my-fundings');
  };

  if (!funding) {
    return <p className="text-center text-red-500">해당 펀딩을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="max-w-md mx-auto px-4 py-7 bg-white min-h-screen">
      {/* 상단 바 */}
      <div className="relative flex items-center justify-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-1 text-2xl text-black p-1"
        >
          <FiChevronLeft className="w-7 h-7" />
        </button>
        <h1 className="text-[22px] font-bold tracking-tight">기대평 남기기</h1>
      </div>

      {/* 제품명 */}
      <div className="text-lg font-bold mb-2">
        {funding.title}
      </div>

      {/* 기대평 입력창 */}
      <textarea
        className="w-full h-28 border rounded-xl p-4 resize-none mb-6 text-base focus:outline-[#6B8F7B] placeholder:text-gray-400"
        placeholder="기대평을 작성해 주세요!"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={300}
      />

      {/* 완료 버튼 */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#538E79] text-white py-3 rounded-lg font-bold text-base"
      >
        완료
      </button>
    </div>
  );
};

export default WriteReview;
